interface Stringifiable {
    toString(): string;
}

export interface TableData extends Record<string, Stringifiable> {
    'Sr. No.': number;
    'Plan Details': string;
    'Interest Rate': string;
    'Investment Range': string;
    'Lock-in Period': string;
    'Action': string;
}

export interface TableData2 extends Record<string, Stringifiable> {
    'Sr. No.': number;
    'Plan Details': string;
    'Withdrawals': string;
    'Rewards Allocated': string;
    'Accrued Rewards': string;
    'Rewards Can Claim': string;
    'Interest Rate': string;
    'Amount Invested': string;
    'Days Remaining': string;
    'Total Claims': string;
}

export interface TableData3 extends Record<string, Stringifiable> {
    'Sr. No.': number;
    'Plan Details': string;
    'Interest Rate': string;
    'Amount Invested': string;
    'Days Remaining': string;
    'Total Claims': string;
    'Status': string;
    'Action': string;
}

export interface treeTable extends Record<string, Stringifiable> {
    'Joinee Name': string;
    'Referral Code': string;
    'Current Staking': string;
    'Current Level': string;
    'Referred By': string;
    'Action': string;
}


