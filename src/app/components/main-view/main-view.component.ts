import { Component } from "@angular/core";
import { Car } from "../models/car-model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CarService } from "src/app/services/car-services";

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html'
})
export class MainViewComponent {

    Car: Car = {
        Name: "",
        Model: "",
        Year: 0
    }
    CarForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private carService: CarService) {
        this.CarForm = this.formBuilder.group({
            Name: ['', Validators.required],
            Model: ['', Validators.required],
            Year: [0, Validators.required]
        });
    }

    addCar() {
        if(this.CarForm.status === 'VALID') {
            this.Car.Name = this.CarForm.value.Name;
            this.Car.Model = this.CarForm.value.Model;
            this.Car.Year = this.CarForm.value.Year;
            this.carService.createCar(this.Car).subscribe({
                next: (res) => {
                    console.log('RES FROM CREATE CAR', res);
                },
                error(err) {
                    console.log('Error creating user', err);
                },
            })
        }
    }
}