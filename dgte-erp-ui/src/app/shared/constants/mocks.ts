// temporary file only
import { CompanyLoanSettings, PersonalDetails } from '@los/shared/models';

export const MockCompanyDetails: CompanyLoanSettings =
  {
    "version": 11,
    "id": 1002,
    "company": {
      "version": 11,
      "id": 1000,
      "code": "EXIST",
      "name": "Exist Software Labs",
      "jgSubsidiary": false,
      "companyUrl": "http://localhost/b/EXIST/1000"
    },
    "rate": 0.45,
    "minimumLoanAmount": 100,
    "maximumLoanAmount": 1000000,
    "itrRequired": true,
    "coeRequired": true,
    "creditInsuranceFormsRequired": true,
    "companyIdRequired": true,
    "govtIdRequired": true,
    "payslipRequired": true,
    "verificationRequired": true,
    "gmiToMlaComputation": [
      {
        "minGmi": 0,
        "maxGmi": 4999,
        "multiplier": 2
      },
      {
        "minGmi": 5000,
        "maxGmi": 9999,
        "multiplier": 3
      },
      {
        "minGmi": 10000,
        "maxGmi": 999999999,
        "multiplier": 4
      }
    ],
    "endorserRoles": [
      {
        "code": "ENDORSER1",
        "description": "Endorser Group 1"
      }
    ],
    "terms": [
      6,
      12,
      18,
      24
    ],
    "loanPurposes": [
      "Emergency Funds",
      "Home improvement",
      "Purchase personal items"
    ],
    "minimumTenureRankAndFile": 6,
    "minimumTenureOfficer": 18,
    "minimumTenure": 6,
    "requiredDocumentation": [
      "ITR",
      "COE",
      "CREDIT_INSURANCE_FORMS",
      "COMPANY_ID",
      "GOVT_ID",
      "PAYSLIP"
    ],
    termsAndConditions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper risus blandit pellentesque tempus. Nam luctus erat in ullamcorper sodales. Ut nisi neque, aliquam eget viverra a, finibus et urna. Nam venenatis odio vel porttitor ornare. Morbi condimentum semper tellus. Aliquam pretium rhoncus cursus. Suspendisse porta, metus vitae pharetra viverra, massa augue eleifend urna, at accumsan mauris urna in lectus. Proin maximus, ante et eleifend egestas, lacus ligula dictum felis, non convallis velit tellus id ante. Suspendisse auctor nisl eget vestibulum placerat.',
      'Nullam sodales, sem eget sollicitudin porttitor, nisl tortor semper risus, vitae molestie ante arcu vel metus. Aenean tristique volutpat neque eu mollis. Curabitur quis justo eget felis laoreet placerat. Donec ac enim lectus. Fusce augue dolor, auctor eget vulputate ac, ornare a magna. Nullam nulla tortor, ultricies et metus a, consectetur interdum enim. Etiam aliquet eu dui ac volutpat. Vestibulum sem libero, egestas a risus et, feugiat eleifend dui.',
      'Praesent iaculis mauris ex, a lobortis libero consectetur vitae. Fusce eleifend justo dui, in sollicitudin ligula pulvinar quis. Curabitur a volutpat nisl. Nam luctus, augue sed imperdiet efficitur, magna eros blandit odio, sed auctor nisl velit nec eros. Vivamus cursus dolor quam, id lacinia tortor pharetra eu. In finibus nunc sapien, at dapibus elit porttitor aliquet. Suspendisse potenti. Sed lacinia rutrum nisi, ac placerat metus tempor in. Aenean ullamcorper elit sapien, ut elementum tellus blandit quis. Sed in urna eu felis sagittis sagittis a vel diam. Quisque blandit bibendum fringilla. Nullam et massa mattis, congue quam non, auctor turpis. Curabitur at purus non felis pellentesque gravida. Donec fringilla felis eu rhoncus feugiat. Sed ut libero id odio faucibus vulputate. Donec tincidunt enim at ex bibendum pulvinar.'
    ],
    dataPrivacy: [
      'Vivamus aliquam lorem quis augue porta, vel aliquet massa ullamcorper. Mauris tristique nibh at magna tristique malesuada. Etiam placerat tellus nec egestas egestas. Fusce hendrerit sollicitudin turpis a sollicitudin. Donec sed leo eget neque rhoncus placerat id ac elit. In ullamcorper eu ligula semper ornare. Pellentesque imperdiet nisl in neque fringilla venenatis. Duis pretium pellentesque molestie. Suspendisse magna mauris, interdum sit amet efficitur sed, pellentesque sit amet sem.',
      'Proin elementum pretium blandit. Nam convallis dictum mattis. Proin ultrices, tortor at tincidunt aliquam, lorem nisi luctus velit, sed hendrerit turpis ipsum a odio. Cras sollicitudin est ut eleifend bibendum. Maecenas et quam urna. Phasellus aliquet risus et faucibus ultricies. Integer eleifend lacinia tortor, nec pellentesque sem sollicitudin vel. Nunc et risus vel nisl faucibus aliquet nec vitae massa. Donec at urna at sapien tincidunt vulputate. Suspendisse id neque sagittis, rhoncus magna vel, efficitur massa. Proin blandit arcu at sem ultrices pharetra. Nulla odio elit, tincidunt sodales libero ultrices, sagittis suscipit tellus. Fusce mollis tellus lacinia, scelerisque tortor quis, mattis augue. Pellentesque ac ex fringilla, consequat urna a, aliquet mauris. Aenean interdum cursus quam, ullamcorper tincidunt tellus laoreet sit amet.'
    ],
    noComakerTenure: 5
  };

export const MockCoMakerDetails: PersonalDetails = {
  emailAdd: 'daqu@mailinator.com',
  firstName: 'Randall',
  gender: 'Female',
  lastName: 'Foley',
  middleName: 'Devin Keith',
  mobileNumber: '590'
}

// confirm payload with backend
export const MockLoanDetails: any = {
  "amount" : 1000,
  "term": 6,
  "borrowerName" : "Harold Sandro Malabanan",
  "comaker" : {
    "firstName" : "Kenneth",
    "middleName" : "Sandro",
    "lastName" : "Malabanan",
    "dateOfBirth" : "2019-04-08",
    "placeOfBirth" : "LAS PINAS",
    "emailAdd" : "test@gmail.com",
    "mobileNumber" : "09215535486",
    "landLineNumber" : "8067827",
    "landLineAreaCode" : "023",
    "gender" : "MALE",
    "civilStatus" : "SINGLE",
    "presentAddress" : {
      "homeNumber" : "25",
      "streetNumber" : "25",
      "streetName" : "TEST",
      "province" : "METRO MANILA",
      "cityName" : "LAS PINAS",
      "zipCode" : "1750",
      "lengthOfStayYears" : 1,
      "lengthOfStayMonths" : 1,
      "houseOwnership" : "RENT",
      "fullAddress" : ", 25, 25, TEST, LAS PINAS, METRO MANILA, 1750"
    },
    "permanentAddress" : {
      "homeNumber" : "25",
      "streetNumber" : "25",
      "streetName" : "TEST",
      "province" : "METRO MANILA",
      "cityName" : "LAS PINAS",
      "zipCode" : "1750",
      "fullAddress" : ", 25, 25, TEST, LAS PINAS, METRO MANILA, 1750"
    }
  },
  "companyLoanComakerSettings" : {
    "companyLoanSettingsId" : 1000,
    "principalTenure" : 18,
    "comakerTenure" : 18,
    "itrRequired" : true,
    "coeRequired" : true,
    "creditInsuranceFormsRequired" : true,
    "companyIdRequired" : true,
    "govtIdRequired" : true,
    "payslipRequired" : true,
    "requiredDocumentation" : [ "Income Tax Return", "Certificate of Employment", "Credit Insurance Forms", "Company ID", "Government ID", "Payslip" ]
  }
}

export const MockLoans = {
  hasNextPage: false,
  totalElement: 3,
  currentPage: 1,
  pageSize: 10,
  results: [
    {
      referenceNumber: '12345',
      borrower: {
        name: 'Juan Cruz',
        rank: 'Rank',
        tenure: '0 yr - 2 mo'
      },
      company: 'Robinsons Bank',
      gms: '40000',
      loanAmount: '20000',
      term: '12',
      dateApplied: '3/31/1990',
      previousLoans: 2,
      coMaker: 'Tony Stark'
    },
    {
      referenceNumber: '12345',
      borrower: {
        name: 'Juan Cruz',
        rank: 'Rank',
        tenure: '0 yr - 2 mo'
      },
      company: 'Robinsons Bank',
      gms: '40000',
      loanAmount: '20000',
      term: '12',
      dateApplied: '3/31/1990',
      previousLoans: 2,
      coMaker: 'Tony Stark'
    },
    {
      referenceNumber: '12345',
      borrower: {
        name: 'Juan Cruz',
        rank: 'Rank',
        tenure: '0 yr - 2 mo'
      },
      company: 'Robinsons Bank',
      gms: '40000',
      loanAmount: '20000',
      term: '12',
      dateApplied: '3/31/1990',
      previousLoans: 2,
      coMaker: 'Tony Stark'
    }
  ]
};

export const MockUserInfo = {
  "id": 1,
  "username": "los",
  "password": "$2y$12$Jou0apvCcd7yygfx3J7IqOkD3ELDxBcc3z9cXP/YLCeu9r4/zlNay",
  "enabled": true,
  "credentialsNonExpired": true,
  "companies": [
    {
      "id": 1000,
      "code": "EXIST",
      "name": "Exist Software Labs",
      "jgSubsidiary": false
    },
    {
      "id": 1001,
      "code": "JB",
      "name": "Jollibee",
      "jgSubsidiary": false
    }
  ],
  "accountNonExpired": true,
  "accountNonLocked": true
};
