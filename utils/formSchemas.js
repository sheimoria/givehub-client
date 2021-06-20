import * as yup from 'yup'

export const loginFormSchema = {
  name: 'login',
  label: 'Login',
  fields: [
    { name: 'usernameOrEmail', label: 'Username or email' },
    { name: 'password', label: 'Password' }
  ],
  validation: yup.object().shape({
    usernameOrEmail: yup.string().required('Required'),
    password: yup.string().required('Required')
  }),
  submitLabel: 'Login'
}

export const individualSignUp = {
  name: 'individualSignUp',
  label: 'Sign up as an individual',
  fields: [
    { name: 'firstName', label: 'First name' },
    { name: 'lastName', label: 'Last name' },
    { name: 'username', label: 'Username' },
    { name: 'email', label: 'Email address' },
    { name: 'password', label: 'Password' }
  ],
  validation: yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    username: yup.string().required('Required'),
    email: yup.string().required('Required'),
    password: yup.string().required('Required')
  }),
  submitLabel: 'Sign up'
}

export const individualSelectCategories = {
  name: 'individualSelectCategories',
  label: 'Which causes are you interested in?',
  fields: [
    { name: 'animalWelfare', label: 'Animal welfare', type: 'checkbox' },
    { name: 'artsHeritage', label: 'Arts and heritage', type: 'checkbox' },
    { name: 'childrenYouth', label: 'Children and youth', type: 'checkbox' },
    { name: 'community', label: 'Community', type: 'checkbox' },
    { name: 'disability', label: 'Disability', type: 'checkbox' },
    { name: 'education', label: 'Education', type: 'checkbox' },
    { name: 'elderly', label: 'Elderly', type: 'checkbox' },
    { name: 'environment', label: 'Environment', type: 'checkbox' },
    { name: 'families', label: 'Families', type: 'checkbox' },
    { name: 'health', label: 'Health', type: 'checkbox' },
    { name: 'humanitarian', label: 'Humanitarian', type: 'checkbox' },
    { name: 'socialService', label: 'Social service', type: 'checkbox' },
    { name: 'sports', label: 'Sports', type: 'checkbox' },
    { name: 'womenGirls', label: 'Women and girls', type: 'checkbox' }
  ],
  validation: yup.object().shape({
    animalWelfare: yup.boolean(),
    artsHeritage: yup.boolean(),
    childrenYouth: yup.boolean(),
    community: yup.boolean(),
    disability: yup.boolean(),
    education: yup.boolean(),
    elderly: yup.boolean(),
    environment: yup.boolean(),
    families: yup.boolean(),
    health: yup.boolean(),
    humanitarian: yup.boolean(),
    socialService: yup.boolean(),
    sports: yup.boolean(),
    womenGirls: yup.boolean()
  }),
  submitLabel: 'Continue'
}

export const charitySignUp = {
  name: 'individualSignUp',
  label: 'Sign up as an individual first',
  fields: [
    { name: 'firstName', label: 'First name' },
    { name: 'lastName', label: 'Last name' },
    { name: 'username', label: 'Username' },
    { name: 'email', label: 'Email address' },
    { name: 'password', label: 'Password' }
  ],
  validation: yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    username: yup.string().required('Required'),
    email: yup.string().required('Required'),
    password: yup.string().required('Required')
  }),
  submitLabel: 'Sign up'
}

export const charityVerification = {
  name: 'charityVerification',
  label: 'Verify your charity',
  fields: [{ name: 'uen', label: 'Enter your UEN' }],
  validation: yup.object().shape({
    uen: yup.string().required('Required')
  }),
  submitLabel: 'Verify'
}

export const charityDetails = {
  name: 'charityDetails',
  label: 'Charity details',
  fields: [
    { name: 'name', label: 'Charity name' },
    { name: 'about', label: 'Description about your charity' },
    { name: 'website', label: 'Website link', placeholder: 'Optional' },
    { name: 'facebook', label: 'Facebook link', placeholder: 'Optional' },
    { name: 'donation', label: 'Donation link', placeholder: 'Optional' }
  ],
  validation: yup.object().shape({
    name: yup.string().required('Required'),
    about: yup.string().required('Required'),
    website: yup.string(),
    facebook: yup.string(),
    donation: yup.string()
  }),
  submitLabel: 'Continue'
}
