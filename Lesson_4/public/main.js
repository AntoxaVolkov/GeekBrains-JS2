document.addEventListener('DOMContentLoaded', init);

function init() {
    "use strict";

    var app = document.querySelector('#app');

    new Vue({
        el: app,
        data: {
            active: 'tab1',
            formData: {
                name: '',
                tel: '',
                email: '',
                city: '',
                text:''
            },
            cities: [],
            citiesShow: false,
            citiesError: false
        },
        methods:{
            openTab(ev){
                console.log(ev);
                this.active = ev.target.getAttribute('href').substr(1);
            },
            findCity(){
                if (this.formData.city.length > 2){
                    fetch('http://localhost:3001/cities/' + this.formData.city).then((data) => {
                        return data.json();
                    }).then((cities) => {
                        if(cities.length > 0){
                            this.citiesError = false;
                            this.cities = cities;
                            this.citiesShow = true;
                        }else if(cities.error){
                            this.citiesError = true;
                        }else{
                            this.citiesError = false;
                        }
                        
                    });
                }else{
                    this.citiesShow = false;
                }
                
            },

            chooseCity(city){
                this.formData.city = city;
                this.citiesShow = false;
            }
        }

    });

   
}


