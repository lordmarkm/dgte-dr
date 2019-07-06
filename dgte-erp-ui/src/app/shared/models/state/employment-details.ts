import { Duration } from './duration';

export class EmploymentDetails {
  companyName: string;
  employeeId: string;
  govtId: string;
  govtIdNumber: string;
  rank: string;
  position: string;
  tenure: Duration;
  employeeNumber: string;
  grossMonthlyIncome: number;

  constructor() {
    this.tenure = new Duration();
  }
}
