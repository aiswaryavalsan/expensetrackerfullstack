const Expense=require('../model/expense')
exports.addExpense=(req,res,next)=>{
    console.log(req.body)
    const amount=req.body.amount;
    const discription=req.body.dis;
    const type=req.body.cat;
     Expense.create({amount:amount,discription:discription,type:type}).then((data)=>{
        console.log(data);
        res.status(201).json({details:data})

        })
        .catch(err=>console.log(err));
   
}
exports.getExpenses=(req,res,next)=>{
    Expense.findAll()
    .then((data)=>{res.json(data)})
    .catch(err=>console.log(err));

}
exports.postDeleteExpense=(req,res,next)=>{
    
    Expense.findByPk(req.params.id).then(data=>{
         return data.destroy();
    })
       .then(()=>{ res.status('200').json("succeffully deleted expense")}) 
         
    .catch(err=>console.log(err))
   
  
}
exports.editExpense=(req,res,next)=>{
    Expense.findByPk(req.body.id).then((expense)=>{
        expense.amount=req.body.amount;
        expense.discription=req.body.dis;
        expense.type=req.body.cat;
        return expense.save();

    }).then(result=>res.json({details:result}))
    .catch(err=>console.log(err));
}