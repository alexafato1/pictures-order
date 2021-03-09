const modal = () => {
   
   function bindModal(trigger, modal, close) {
    trigger.forEach(item => {
    item.addEventListener('click', (e) => {
       
         
         if(e.target) {
            e.preventDefault();
            
         }
         modal.style.display = 'block';
         
         document.body.style.everflow = 'hidden';
      });

      close.forEach(item => {
      item.addEventListener('click', () => {
         modal.style.display = 'none';
         document.body.style.everflow = '';
      });
      })
   });
   }

   const callModal = document.querySelectorAll('.button-modal'),
      modalOpen = document.querySelector('.popup'),
      modalClose = document.querySelectorAll('.closeBtn')

    bindModal(callModal, modalOpen, modalClose)


    function showModalByTime(selector, time) {
      setTimeout(function(){
         document.querySelector(selector).style.display = 'block';
         
      }, time);
   }
    
   //showModalByTime('.popup', 10000);
  
};

const sliders = (slides, prev, next) => {
  let slideIndex = 1;
  const  items = document.querySelectorAll(slides),
         prevBtn = document.querySelectorAll(prev),
         bextBtn = document.querySelectorAll(next);

   function showSlides(n) {
     
      if(n > items.length-1){
         slideIndex = 0;
      }
       
      if(n < 0) {
         slideIndex = items.length-1;
      }
      
      items.forEach(item => {
         item.classList.add('animated');
         item.style.display = 'none';
      });

      items[slideIndex].style.display = 'block'
      
   }
   
   showSlides(slideIndex);

   function plusSlides() {
      
      showSlides(slideIndex += 1);
   }

   function minusSlides() {
      console.log(slideIndex )
      showSlides(slideIndex -= 1);
   }


   try{
      const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

      prevBtn.addEventListener('click', () => {
          minusSlides();
         
      });

      nextBtn.addEventListener('click', () => {
         plusSlides();

     });
     
    
   } 

   catch(e){}
  
   function slideByTime() {
      setInterval(function(){
         
         plusSlides(1);
         
      }, 3000);
   }

   

   items[1].parentNode.addEventListener('mouseenter', () => {
      console.log('work')
      clearInterval(slideByTime)
   })
  
  

}

const calc = (size, material, options, promocode, result)=>{
   const sizeBlock = document.querySelector(size),
         materialBlock = document.querySelector(material),
         optionsBlock = document.querySelector(options),
         promocodeBlock = document.querySelector(promocode),
         resultBlock = document.querySelector(result);

  let sum = 0;

  const calcFunc = () => {
      sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
      if(sizeBlock.value === '' || materialBlock.value === '' ){
         resultBlock.textContent  = 'Пожалуйста, выберите размер и материал картины';
      } else if (promocodeBlock.value === 'IVANTPOPART'){
          resultBlock.textContent = Math.round(sum * 0.7);
      } else {
        resultBlock.textContent = sum
        console.log('сумма',resultBlock)
      }
  }
  sizeBlock.addEventListener('change', calcFunc);
  materialBlock.addEventListener('change', calcFunc);
  optionsBlock.addEventListener('change', calcFunc);
  promocodeBlock.addEventListener('input', calcFunc);
};


function filter(){
 
   document.querySelectorAll('.filter-button').forEach(btn =>
      
      btn.addEventListener('click', function(){
         document.querySelectorAll('.filter-button').forEach(btn =>{
           btn.classList.remove('active-btn') 
         })
       this.classList.add('active-btn')
       document.querySelectorAll('.filter').forEach(filter =>
         
       filter.classList.remove('show')
       );
       console.log("click");
     let value = this.getAttribute('data-filter');
  
    
      document.querySelectorAll(`.${value}`).forEach(item => {
         item.classList.add('show')
      })
     
    if(value== 'all'){
     
        document.querySelectorAll('.filter').forEach(filter => filter.classList.add('show'))
       }
   }))}



const forms = () => {
   const form = document.querySelectorAll('form'),
         input = document.querySelectorAll('input');
         phoneInputs = document.querySelectorAll('input[name="phone"]');

         phoneInputs.forEach(item => {
            item.addEventListener('input', () => {
               item.value = item.value.replace(/\D/,'');
            })
         });

   const message = {
         loading: 'Загрузка...',
         success: ' Спасибо! Скоро мы с вами свяжемся',
         failure: 'Что-то пошло не так... ',
         spinner: './img/spinner.gif',
         ok:'./img/ok.png',
         fail:'./img/fail.png'
   }; 

const path = {
   designer: 'server.php',
   question: 'question.php'
}


const postData = async (url, data) => {
   document.querySelector('.status').textContent = message.loading;
   let res = await fetch(url, { 
       method: 'POST',
       body: data
   });
   
   return await res.text();
}

const clearInputs = () => {
   input.forEach(item => {
      item.value = '';
   });
};
 

form.forEach(item => {
   item.addEventListener('submit', (e) => {
       e.preventDefault();

       let statusMessage = document.createElement('div'); 
         statusMessage.classList.add('status'); 
         item.parentNode.appendChild(statusMessage);

         item.classList.add('animated', 'fadeOutUp');
         setTimeout(()=> {
            item.style.display = 'none';
         }, 300);

         let statusImg = document.createElement('img');
         console.log(statusImg)
         statusImg.setAttribute('src',message.spinner)
         statusImg.classList.add('fadeInUp');
         statusMessage.appendChild(statusImg);
         console.log(statusMessage)
        
           

         const formData = new FormData(item);
         formData.append('totalPrice', document.querySelector('.calc-price').textContent);
         let api;
         item.closest('.popup-design') ? api = path.designer : api = path.question;
         console.log("hello");
         console.log(api);
         postData(api, formData)
         
           .then(res => {
               console.log('res')
               console.log(res);
               statusImg.setAttribute('src', message.ok)
               statusMessage.textContent = message.success
               
           })
           .catch(() =>  
            statusImg.setAttribute('src', message.fail),
            statusMessage.textContent = message.failure)
           .finally(() =>{
                console.log(api);
                clearInputs();
                setTimeout(() => {
                   statusMessage.remove();
                   item.style = 'block';
                   item.classList.remove('fadeOutUp');
                   item.classList.add('fadeInUp');
                }, 3000);
           });
         
   }); 
});
};

const accordeon = (triggers, items) => {

   const btns = document.querySelectorAll(triggers),
         blocks = document.querySelectorAll(items);
   blocks.forEach(block => {
        block.classList.add('animated', 'fadeInDown')
       
   });
   btns.forEach(btn => {
      btn.addEventListener('click', function() {
           if(!this.classList.contains('active')){
              btns.forEach(btn => {
                 btn.classList.remove('active', 'active-style');
              });
              this.classList.add('active', 'active-style');
           }
      })
   })
};




const drop = () => {
   const fileInputs = document.querySelectorAll('[name="upload"]');
   ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
      fileInputs.forEach(input => {
         input.addEventListener(eventName, preventDefaults, false);
      })
   })
   function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
   }
   function hightLight(item){
      item.closest('.file_upload').style.border = '5px solid blue';
   }

   function unhightLight(item){
      item.closest('.file_upload').style.border = 'none';
   }

   ['dragenter',  'dragover' ].forEach(eventName => {
      fileInputs.forEach(input => {
         input.addEventListener(eventName, ()=> hightLight(input), false);
      });
   });

   ['dragleave',  'drop' ].forEach(eventName => {
      fileInputs.forEach(input => {
         input.addEventListener(eventName, ()=> unhightLight(input), false);
      })
   })

   fileInputs.forEach(input => {
      input.addEventListener('drop', (e) => {
        input.files = e.dataTransfer.files;
      })
   })
}




window.addEventListener('DOMContentLoaded', () => {
   drop();
   sliders('.feedback__slide','.prev', '.next')
   accordeon('.question', '.answer')
   forms();
   modal();
   filter();

   calc('#size', '#material', '#options', '.promocode', '.calc-price');
});


