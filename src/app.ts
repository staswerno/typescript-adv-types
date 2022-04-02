// **intersection types**
// similar to interfaces, bit less code

type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// combo of above types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: "Stasi",
	privileges: ["dungeon-master"],
	startDate: new Date(),
};

// can do any types
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// **type guards**
// if statement below is a type guard

function add(a: Combinable, b: Combinable) {
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return a + b;
}

// typeof won't find 'privileges' property below
// another type guard needed: if ("property" in x) {}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	console.log("Name: " + emp.name);
	if ("privileges" in emp) {
		console.log("Privileges: " + emp.privileges);
	}
	if ("startDate" in emp) {
		console.log("Start Date: " + emp.startDate);
	}
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: "Jopi", startDate: new Date() });

// **instanceof typeguard** (js)
// works only with classes, not instances

class Car {
	drive() {
		console.log("Driving...");
	}
}

class Truck {
	drive() {
		console.log("Driving a truck...");
	}
	loadCargo(amount: number) {
		console.log("Loading cargo... " + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
}

useVehicle(v1);
useVehicle(v2);

// **discriminated unions**
// works with object types/interfaces
// use common property to describe object
// use common property in switch check

interface Bird {
	type: "bird";
	flyingSpeed: number;
}

interface Horse {
	type: "horse";
	runningSpeed: number;
}

type Animal = Bird | Horse;

// 2 kinds of speed
// type check can get bulky with many animals
// instanceof doesn't work with interface as not compliled to js

function moveAnimal(animal: Animal) {
	let speed;
	switch (animal.type) {
		case "bird":
			speed = animal.flyingSpeed;
			break;
		case "horse":
			speed = animal.runningSpeed;
			break;
	}
	console.log("Moving with speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 12 });

// typecasting
// used when ts can't figure out type
// eg getElementById - ts doesn't know exact html element

const paragraph = document.getElementById("message-output");
// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
const userInputElement = document.getElementById(
	"user-input"
)! as HTMLInputElement;

// ! tells TS preceding expression will never yield null
// otherwise use if check. remove type cast from getElement line, then see below*
// but need to tell TS it's an input element
// <with type casting> - DOM
// ! as with type casting - React
// choose, don't alternate

userInputElement.value = "Hi!";

// *
if (userInputElement) {
	(userInputElement as HTMLInputElement).value = "Hi there!";
}

// index types
// good for flexible objects
// eg different error messages for multiple input fields
// want to use containter on any form
// clear on value, not clear on number or name of properties

interface ErrorContainer {
	// { email: 'Not a valid email', username: 'Must start with a character'}
	[prop: string]: string;
	// stings/numbers/Symbols
	// saying: dk property name or count
	// just know every property name and value is string
	// can no only use strings
}

const errorBag: ErrorContainer = {
	email: "Not a valid email!",
	username: "Must start with capital letter!",
};
