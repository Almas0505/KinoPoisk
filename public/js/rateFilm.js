const stars = document.querySelectorAll('.comments-star>img')
function rateFilm(rate){
      for(let i = 0; i< stars.length; i++){
         stars[i].classList.remove('active-star')
      }
      for (let i = 0; i < rate ; i++) {
         stars[i].classList.add('active-star')
      }     
}

function sendRate(){
   e.preventDefault()
   const activeStarts = doccument.querySelectorAll('.active-star')
   const comment_text = document.querySelector('#comment-text')
   

}