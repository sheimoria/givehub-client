import * as yup from 'yup'

export const logInSchema = {
  name: 'logIn',
  label: 'Log in',
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

export const signUpSchema = {
  name: 'signUp',
  label: 'Sign up as user',
  fields: [
    { name: 'firstName', label: 'First name' },
    { name: 'lastName', label: 'Last name' },
    { name: 'username', label: 'Username' },
    { name: 'email', label: 'Email address' },
    { name: 'password', label: 'Password' },
    /* { name: 'gender', label: 'Gender' }, */
    { name: 'about', label: 'Bio', type: 'textarea' },
    { name: 'telegramHandle', label: 'Telegram handle' },
    {
      name: 'categories',
      label: 'Interests',
      type: 'select',
      options: [
        { name: 1, label: 'Animal Welfare' },
        { name: 2, label: 'Arts and Heritage' },
        {
          name: 3,
          label: 'Children and Youth'
        },
        { name: 4, label: 'Community' },
        { name: 5, label: 'Disability' },
        { name: 6, label: 'Education' },
        { name: 7, label: 'Elderly' },
        { name: 8, label: 'Environment' },
        { name: 9, label: 'Families' },
        { name: 10, label: 'Health' },
        { name: 11, label: 'Humanitarian' },
        { name: 12, label: 'Social Service' },
        { name: 13, label: 'Sports' },
        { name: 14, label: 'Women and Girls' }
      ]
    }
  ],
  submitLabel: 'Continue'
}

export const charitySignUpSchema = {
  name: 'charitySignUpSchema',
  label: 'Sign up as charity',
  fields: [
    { name: 'name', label: 'Charity name' },
    { name: 'uen', label: 'Unique entity number (UEN)' },

    /* {
      name: 'description',
      label: 'Description about your charity',
      type: 'textarea'
    }, */
    {
      name: 'categories',
      label: 'Which category does your charity fall under?',
      type: 'select',
      options: [
        { name: 1, label: 'Animal Welfare' },
        { name: 2, label: 'Arts and Heritage' },
        {
          name: 3,
          label: 'Children and Youth'
        },
        { name: 4, label: 'Community' },
        { name: 5, label: 'Disability' },
        { name: 6, label: 'Education' },
        { name: 7, label: 'Elderly' },
        { name: 8, label: 'Environment' },
        { name: 9, label: 'Families' },
        { name: 10, label: 'Health' },
        { name: 11, label: 'Humanitarian' },
        { name: 12, label: 'Social Service' },
        { name: 13, label: 'Sports' },
        { name: 14, label: 'Women and Girls' }
      ]
    },
    /* { name: 'email', label: 'Email address' },
    { name: 'website', label: 'Website', placeholder: 'Optional' },
    { name: 'phoneNumber', label: 'Phone number', placeholder: 'Optional' }, */
    { name: 'physicalAddress', label: 'Address', placeholder: 'Optional' },
    { name: 'postalCode', label: 'Postal code', placeholder: 'Optional' }
  ],
  validation: yup.object().shape({
    uen: yup.string().required('Required'),
    name: yup.string().required('Required'),
    /* description: yup.string().required('Required'), */
    categories: yup.array(yup.number()).ensure(),
    /* email: yup.string().required('Required'),
    website: yup.string(),
    phoneNumber: yup.string(), */
    physicalAddress: yup.string(),
    postalCode: yup.string()
  }),
  submitLabel: 'Continue'
}

export const updateCharitySchema = {
  name: 'updateCharitySchema',
  label: 'Update charity',
  fields: [
    { name: 'name', label: 'Charity name' },
    { name: 'uen', label: 'Unique entity number (UEN)' },
    {
      name: 'categories',
      label: 'Which category does your charity fall under?',
      type: 'select',
      options: [
        { name: 1, label: 'Animal Welfare' },
        { name: 2, label: 'Arts and Heritage' },
        {
          name: 3,
          label: 'Children and Youth'
        },
        { name: 4, label: 'Community' },
        { name: 5, label: 'Disability' },
        { name: 6, label: 'Education' },
        { name: 7, label: 'Elderly' },
        { name: 8, label: 'Environment' },
        { name: 9, label: 'Families' },
        { name: 10, label: 'Health' },
        { name: 11, label: 'Humanitarian' },
        { name: 12, label: 'Social Service' },
        { name: 13, label: 'Sports' },
        { name: 14, label: 'Women and Girls' }
      ]
    },
    { name: 'physicalAddress', label: 'Address', placeholder: 'Optional' },
    { name: 'postalcode', label: 'Postal code', placeholder: 'Optional' }
  ],
  validation: yup.object().shape({
    name: yup.string().required('Required'),
    uen: yup.string().required('Required'),
    categories: yup.array(yup.number()).ensure(),
    physicalAddress: yup.string(),
    postalcode: yup.string()
  }),
  submitLabel: 'Save changes'
}

export const eventSchema = {
  name: 'event',
  label: 'Create event',
  fields: [
    { name: 'name', label: 'Name' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'dateStart', label: 'Start date' },
    { name: 'dateEnd', label: 'End date' },
    { name: 'venue', label: 'Venue' }
  ],
  validation: yup.object().shape({
    name: yup.string().required('Required'),
    description: yup.string().required('Required'),
    dateStart: yup.string().required('Required'),
    dateEnd: yup.string().required('Required'),
    venue: yup.string().required('Required')
  }),
  submitLabel: 'Create Event'
}

export const newPost = {
  name: 'newPost',
  label: 'New post',
  fields: [
    { name: 'title', label: 'Title' },
    { name: 'text', label: 'Text', type: 'textarea' }
  ],
  validation: yup.object().shape({
    title: yup.string().required('Required'),
    text: yup.string().required('Required')
  }),
  submitLabel: 'Post'
}

export const editPost = {
  name: 'editPost',
  label: 'Edit post',
  fields: [
    { name: 'title', label: 'Title' },
    { name: 'text', label: 'Text', type: 'textarea' }
  ],
  validation: yup.object().shape({
    title: yup.string().required('Required'),
    text: yup.string().required('Required')
  }),
  submitLabel: 'Save'
}
