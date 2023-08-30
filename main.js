
const container = document.querySelector('.container');
const movie = document.querySelector('#movie');
const info = document.querySelector('.infoText');
const movieImg = document.querySelector('.movieImg')
const seats = document.querySelectorAll(".seat:not(.reserved)");

const getSeatsDataFromDataBase = () => {
   const dbSelecetedMovie = JSON.parse(localStorage.getItem('movieIndex'));
   if (dbSelecetedMovie) {
      movie.selectedIndex = dbSelecetedMovie;
   }
   const dbSelectedSeats = JSON.parse(localStorage.getItem("selectedIndex"))
   if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
      seats.forEach((seat, index) => {
         if (dbSelectedSeats.indexOf(index) > -1) {
            seat.classList.add("selected");

         } else {
            seat.classList.remove("selected")
         }

      })

   }
}

const saveToDataBase = (setIndexData) => {
   localStorage.setItem("selectedIndex", JSON.stringify(setIndexData));
   localStorage.setItem("movieIndex", JSON.stringify(movie.selectedIndex));
}

getSeatsDataFromDataBase();


const calculateTotal = () => {
   const selectedSeats = container.querySelectorAll(".seat.selected");

   const allSeatsArray = [];
   const allSelectedSeatsArray = [];

   seats.forEach((seat) => {
      allSeatsArray.push(seat);
   });


   selectedSeats.forEach((selectedSeat) => {
      allSelectedSeatsArray.push(selectedSeat);
   });

   let selectedIndex = allSelectedSeatsArray.map((allSelectedSeat) => {
      return allSeatsArray.indexOf(allSelectedSeat);
   });

   let selectedSeatsCount = container.querySelectorAll('.seat.selected').length


   if (selectedSeatsCount > 0) {
      info.style.display = 'block';
   } else {
      info.style.display = 'none';
   }

   let price = movie.value;
   let total = price * selectedSeatsCount;
   info.innerHTML = `<span>${selectedSeatsCount}</span> koltuk için hesaplanan ücret<span> ${total} </span>`

   saveToDataBase(selectedIndex)

}
calculateTotal();

container.addEventListener('click', (e) => {

   if (e.target.offsetParent.classList.contains('seat') &&
      !e.target.offsetParent.classList.contains('reserved'));

   {
      e.target.offsetParent.classList.toggle('selected');
      calculateTotal();
   }

})

movie.addEventListener('change', () => {
   calculateTotal();
});








