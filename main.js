
const container= document.querySelector('.container');
const movie=document.querySelector('#movie');
const info=document.querySelector('.infoText');
const movieImg=document.querySelector('.movieImg')


const calculateTotal=()=>{

   let selectedSeatsCount= container.querySelectorAll('.seat.selected').length
  

   if(selectedSeatsCount>0){
   info.style.display='block';
   } else {
   info.style.display='none';
   }

   let price = movie.value;
   let total= price*selectedSeatsCount;
   info.innerHTML= `<span>${selectedSeatsCount}</span> koltuk için hesaplanan ücret<span> ${total} </span>`

}
calculateTotal();

container.addEventListener('click',(e)=>{

   if  (e.target.offsetParent.classList.contains('seat')&&
   !e.target.offsetParent.classList.contains('reserved'));

    {
   e.target.offsetParent.classList.toggle('selected');
   calculateTotal();
   }
   
 })

  movie.addEventListener('change', () => {
  calculateTotal();
   });








