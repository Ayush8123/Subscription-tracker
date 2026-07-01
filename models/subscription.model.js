import mongoose from "mongoose";
const subscriptionschema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'subscription name is required'],
            trim:true,
            minLength:2,
            maxLength:100
        },
        price:{
            type:Number,
            required:[true,'subscription price is required'],
            min:[0,'price must be greater than 0'],
            max:[1000,'price must be less than 1000'],
        },
        currency:{
            type:String,
            enum:['USD','EUR','INR'],
            default:'INR'
        },
        frequency:{
            type:String,
            enum:['daily','monthly','weekly','yearly']
        },
        category:{
            type:String,
            enum:['sports','news','entertainment','lifestyle','other'],
            required:true
        },
        paymentmethod:{
            type:String,
            required:true,
            trim:true,
        },
        status:{
            type:String,
            enum:['active','cancel','expired'],
            default:'active'
        },
        startdate:{
            type:Date,
            required:true,
            validate:{
                validator: function (value) {
                    const today = new Date();//current date
                    return value <= today;
                },
                message: 'Start date cannot be in the future'
            }
        },
        renewaldate:{
            type:Date,
            validate:{
                validator:function(value){
                    return value > this.startdate;//if this is false then message will be printed
                },
                message:'renewal date must be after the start date'
            }
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,//referense 
            ref:"User",
            required:true,
            index:true
        }
    },
    {
        timestamps:true
    }
)

// auto calculate renewal date if missing
subscriptionschema.pre('save',function(next){
    if(!this.renewaldate){
        this.renewaldate=new Date(this.startdate);
        switch(this.frequency){
            case 'daily':
                this.renewaldate.setDate(this.renewaldate.getDate()+1);
                break;
            case 'weekly':
                this.renewaldate.setDate(this.renewaldate.getDate()+7);
                break;
            case 'monthly':
                this.renewaldate.setMonth(this.renewaldate.getMonth()+1);
                break;
            case 'yearly':
                this.renewaldate.setFullYear(this.renewaldate.getFullYear()+1);
                break;
        }
    }

    // auto update status if renewal date has already passed
    if(this.renewaldate < new Date()){
        this.status='expired'
    }
    // next();
})

const Subscription=mongoose.model('Subscription',subscriptionschema);
export default Subscription;