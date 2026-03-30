import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// UserForm component - handles user editing with Formik validation
// Props:
// - userData: object (user to edit)
// - onSuccess: function(responseData) - called on successful API response
// - onError: function(error) - called on API error
// - onSavingChange: function(isSaving) - called to update parent loading state
// - onValidationChange: function(isValid) - called when validation state changes
// - formRef: React ref - ref to the form element for triggering submission
export default React.forwardRef(function UserForm({ 
  data,
  onSuccess, 
  onError,
  onSavingChange,
  onValidationChange,
  formRef
}, componentRef) {
  const [isSaving, setIsSaving] = React.useState(false);

  // Validation schema for user fields
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    gender: Yup.string().required('Gender is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    // Prefer canonical `data` prop (passed from MDialogBox); fallback to
    // legacy `userData` prop for backward compatibility.
    initialValues: {
      firstName: data?.firstName ?? data?.firstName ?? '',
      lastName: data?.lastName ?? data?.lastName ?? '',
      email: data?.email ?? data?.email ?? '',
      phone: data?.phone ?? data?.phone ?? '',
      gender: data?.gender ?? data?.gender ?? '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const updated = { ...data, ...values };
      setIsSaving(true);
      onSavingChange?.(true);

      try {
        // Do not perform API calls here — let the parent (page) dispatch
        // the Redux thunk (e.g. `updateUser`) to perform the PUT and
        // update the store. Report success with the updated object.
        onSuccess?.(updated);
      } catch (error) {
        console.error('Error in UserForm submit:', error);
        onError?.(error);
      } finally {
        setIsSaving(false);
        onSavingChange?.(false);
      }
    },
  });

  // Expose form state via ref so parent can access isValid and isSaving
  React.useImperativeHandle(componentRef, () => ({
    isValid: formik.isValid,
    isSaving,
  }));

  // Notify parent of validation changes
  React.useEffect(() => {
    onValidationChange?.(formik.isValid);
  }, [formik.isValid, onValidationChange]);

  return (
    <form onSubmit={formik.handleSubmit} id="edit-user-form" ref={formRef}>
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        id="firstName"
        name="firstName"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />

      <TextField
        fullWidth
        margin="dense"
        id="lastName"
        name="lastName"
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />

      <TextField
        fullWidth
        margin="dense"
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        fullWidth
        margin="dense"
        id="phone"
        name="phone"
        label="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />

      <TextField
        fullWidth
        margin="dense"
        id="gender"
        name="gender"
        label="Gender"
        value={formik.values.gender}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.gender && Boolean(formik.errors.gender)}
        helperText={formik.touched.gender && formik.errors.gender}
      />
    </form>
  );
});
