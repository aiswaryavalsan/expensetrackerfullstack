let form=document.getElementById('form');
let expense=document.getElementById('expense');
let discription=document.getElementById('discription');
let category=document.getElementById('category');
let id=document.getElementById("id");
console.log(id);

let edit=false;
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/expens/allexpenses")
    .then((response)=>{
    for(var i=0;i<response.data.length;i++){
        showExpenseOnScreen(response.data[i]);
    }})
    .catch((err)=>console.log(err))
    })
function showExpenseOnScreen(expenses)
{
  let deleteBtn=document.createElement('button');
 
  let editBtn=document.createElement('button');
  deleteBtn.appendChild(document.createTextNode('delete'));

  editBtn.appendChild(document.createTextNode('edit'));
  let parent=document.getElementById('userexpense');
console.log(parent);
console.log(expenses);
 let childhtml= `<li id=${expenses.id} > ${expenses.amount}- ${expenses.discription}-${expenses.type}
  <button onclick=deleteitem('${expenses.id}')>delete</button>
  <button onclick=edititem('${expenses.id}','${expenses.amount}','${expenses.discription}','${expenses.type}')>edit</button>
  </li>`;
 
  parent.innerHTML=parent.innerHTML+childhtml;

}
function removeExpenseFromScreen(id)
{
  let parent=document.getElementById('userexpense');
  let child=document.getElementById(id);
  parent.removeChild(child);

}
function deleteitem(id){
    // removeUserFromScreen(id);
       axios.delete(`http://localhost:3000/expens/${id}`)
       .then((resolve)=>{
       removeExpenseFromScreen(id)
     })
       .catch(err=>console.log(err));
   
   }
function edititem(id,amount,dis,cat)
{
  document.getElementById('id').value=id;
  document.getElementById('expense').value=amount;
  document.getElementById('discription').value=dis;
  document.getElementById('category').value=cat;
  edit=true;
  removeExpenseFromScreen(id);
 

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let id=document.getElementById("id").value?document.getElementById("id").value:'';
   let amount=expense.value;
   let dis=discription.value;
   let cat=category.value;
   console.log(amount);
   console.log(dis);
   console.log(cat);
   let obj={amount,dis,cat,id};
   axios.post(!edit?"http://localhost:3000/expens/addexpense":"http://localhost:3000/expens/editexpense",obj)
   .then((resolve)=>{
    console.log(resolve.data);
    showExpenseOnScreen(resolve.data.details);
    edit=false;
   }
    )
  
   .catch((err)=>
   
    alert(err));
   
})