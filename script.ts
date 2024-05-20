class Elevator {
  private currentFloor: number = 0;
  private isMoving: boolean = false;
  private timePerFloor: number = 500; // milliseconds
  private waitTime: number = 2000; // milliseconds
  private totalElevators: number;

  constructor(private totalFloors: number) {
    this.totalElevators = 3; // Example: 3 elevators
  }

  move(floor: number): void {
    if (!this.isMoving) {
      this.isMoving = true;
      const floorsToMove = Math.abs(floor - this.currentFloor);
      const totalTime = floorsToMove * this.timePerFloor + this.waitTime;
      
      // Update display
      const display = document.querySelector('.display') as HTMLElement;
      display.innerText = floor.toString();
      
      setTimeout(() => {
        this.currentFloor = floor;
        this.isMoving = false;
        // Play ding sound
        const ding = new Audio('ding.mp3');
        ding.play();
      }, totalTime);
    }
  }
}

// Initialize elevators with total number of floors
const elevators: Elevator[] = [];
for (let i = 0; i < 3; i++) {
  const elevator = new Elevator(24); // Example: 24 floors
  elevators.push(elevator);
}

// Add event listeners to elevator buttons
const buttons = document.querySelectorAll('.floor');
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const elevatorIndex = Math.floor(index / (24 / 3)); // Distribute floors evenly among elevators
    elevators[elevatorIndex].move(index);
  });
});
