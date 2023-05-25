import { Component, OnInit } from "@angular/core";
import { Car } from "../models/car-model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CarService } from "src/app/services/car-services";
import { map, take } from "rxjs";

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

    Car: Car = {
        name: "",
        model: "",
        year: 0
    }
    CarForm: FormGroup;
    cars: Car[] = []

    constructor(private formBuilder: FormBuilder, private carService: CarService) {
        this.CarForm = this.formBuilder.group({
            Name: ['', Validators.required],
            Model: ['', Validators.required],
            Year: [0, Validators.required]
        });
    }
    ngOnInit(): void {
        this.loadCars();
    }

    addCar() {
        if (this.CarForm.status === 'VALID') {
            this.Car.name = this.CarForm.value.Name;
            this.Car.model = this.CarForm.value.Model;
            this.Car.year = this.CarForm.value.Year;
            this.carService.createCar(this.Car).subscribe({
                next: (res) => {
                    this.loadCars();
                },
                error(err) {
                    console.log('Error creating user', err);
                },
            })
        }
    }

    loadCars() {
        this.carService.getCars()
            .pipe(take(1))
            .subscribe(data => {
                this.cars = data;
            })
    }
}