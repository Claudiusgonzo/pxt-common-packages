namespace jacdac {
    export class ServoService extends ActuatorService {
        servo: servos.Servo;
        constructor(name: string, servo: servos.Servo) {
            super(name, jacdac.SERVO_DEVICE_CLASS, 5, 2);
            this.servo = servo;
        }

        addAdvertisementData() {
            this.controlData.setNumber(NumberFormat.Int16LE, 0, this.servo.angle);
            return super.addAdvertisementData();
        }

        protected handleStateChanged(): number {
            const on = !!this.state[0];
            if (!on)
                this.servo.stop();
            else {
                const angle = this.state.getNumber(NumberFormat.Int16LE, 1);
                const pulse = this.state.getNumber(NumberFormat.Int16LE, 3);
                if (pulse)
                    this.servo.setPulse(pulse);
                this.servo.setAngle(angle);
            }
            return jacdac.DEVICE_OK;
        }
    }
}