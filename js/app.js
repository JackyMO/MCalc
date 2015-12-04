// patching the touch and click event.
if (window.Touch) {
  $('a').bind('touchstart', function(e) {
    e.preventDefault();
  });
  $('a').bind('touchend', function(e) {
    e.preventDefault();
    return $(this).trigger('click');
  });
}

// Model
// Anything related to data querying and manipulation
;(function($){
  var app = this.app || (this.app={});

  var tf = this.mcalc = {}

}).call(this, jQuery);

// View
// Anything that belongs to interface.
;(function($){
  var app = this.app || (this.app={});

  app.view = {}

  $(function(){

    $('#calculate-btn').click(function(e){
      var homeCalculater = new mcalc.HomeCalculater();  
      $.mobile.changePage("#homeCalcResult");
      homeCalculater.calculate();
    });
    // handle the reset button
    $('#reset-btn').click( function(e){
      var homeCalculater = new mcalc.HomeCalculater();
      homeCalculater.reset();
    });
  });
}).call(this, jQuery);

// Controller Logic
// Glue the model and view together
;(function($){

  // Entry point
  $(function(){
    console.log("Hello New jQuery Mobile App.");
  });

  var HomeCalculater = (function(){
    function HomeCalculater() {
      this.priceValue = $('#priceValue').val() * 10000; // the counting variable
      this.loanRatio = $('#loanRatio').val(); // the counting variable
      this.loanPeriod = $('#loanPeriod').val(); // the counting variable
      this.interestRate = $('#interestRate').val(); // the counting variable
      
    }

    HomeCalculater.prototype.calculate = function() {
      this.monthRate = this.interestRate / 100 / 12;
      this.loanValue = this.priceValue  * this.loanRatio / 100;
      this.loanMonth = this.loanPeriod*12;
      
      //this.monthOffer = this.loanValue * this.monthRate/(1 - Math.pow((1+this.monthRate),-this.loanMonth));
      this.monthOffer = (this.loanValue * this.monthRate * Math.pow((1+this.monthRate), this.loanMonth))/(Math.pow((1+this.monthRate), this.loanMonth) -1);

      //P * ((r * T / (1 - (1 + r/N)^(-N*T))) - 1)
      this.totalInterrest = this.loanValue * ((this.interestRate / 100 * this.loanPeriod / (1 -Math.pow((1+this.monthRate),-this.loanMonth)))-1);

      $('#firstPay').val(this.priceValue  * ((100 - this.loanRatio) / 100) / 10000);
      $('#loanValue').val(this.loanValue/10000);
      $('#monthOffer').val(Math.round(this.monthOffer*100)/100);
      $('#totalInterrest').val(Math.round(this.totalInterrest*100)/100);
    }

    HomeCalculater.prototype.reset = function(){
      $('#priceValue').val('');
      $('#loanRatio').val('');
      $('#loanPeriod').val('');
      $('#interestRate').val('');
    }

    return HomeCalculater;
  })();

  mcalc.HomeCalculater=HomeCalculater;

}).call(this, jQuery);

