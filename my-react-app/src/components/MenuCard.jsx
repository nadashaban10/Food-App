import React from 'react';

const MenuCard = () => {
  return <div class="Menu-container">
        
  <div class="Menu-card">
      <img src="./images/menu1.jpg" ></img>
      <h3 class="Menu-title">Burger and Fries</h3>
      <p class="Menu-description">Beef Burgere With Delicious Fries</p>
      <h6 class="Menu-price">$150.99</h6>
      <ul class="Menu-rating">
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
      </ul>
      <button class="add-to-cart-btn">Add to Cart</button>
  </div>  


  <div class="Menu-card">
      <img src="./images/menu2.jpg" ></img>
      <h3 class="Menu-title">Chicken Fries</h3>
      <p class="Menu-description">Delicious Checken Fries</p>
      <h6 class="Menu-price">$200</h6>
      <ul class="Menu-rating">
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star "></i></li>
          <li class="stars"><i class="fa fa-star "></i></li>
      </ul>
      <button class="add-to-cart-btn">Add to Cart</button>
  </div>    
  
  <div class="Menu-card">
      <img src="./images/menu3.jpg" ></img>
      <h3 class="Menu-title">Pancake</h3>
      <p class="Menu-description">Choclate Pancake</p>
      <h6 class="Menu-price">$50</h6>
      <ul class="Menu-rating">
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star "></i></li>
      </ul>
      <button class="add-to-cart-btn">Add to Cart</button>
  </div>    

  <div class="Menu-card">
      <img src="./images/menu4.jpg" ></img>
      <h3 class="Menu-title">Big Italian Salad</h3>
      <p class="Menu-description">Delicious Big Italian Salad</p>
      <h6 class="Menu-price">$90</h6>
      <ul class="Menu-rating">
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
          <li class="stars"><i class="fa fa-star checked"></i></li>
      </ul>
      <button class="add-to-cart-btn">Add to Cart</button>
  </div>    


</div>
;
};

export default MenuCard;