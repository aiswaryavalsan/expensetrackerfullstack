const express=require('express');
const router=express.Router();
const expenseController=require('../controller/expense');
router.post('/addexpense',expenseController.addExpense);
router.get('/allexpenses',expenseController.getExpenses);
router.delete('/:id',expenseController.postDeleteExpense)
router.post('/editexpense',expenseController.editExpense);
module.exports=router;