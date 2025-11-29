import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProduct } from './getProducts.js';

// ProductForm component - handles product editing with Formik validation
// Props:
// - productData: object (product to edit)
// - onSuccess: function(responseData) - called on successful API response
// - onError: function(error) - called on API error
// - onSavingChange: function(isSaving) - called to update parent loading state
// - onValidationChange: function(isValid) - called when validation state changes
// - formRef: React ref - ref to the form element for triggering submission
export default React.forwardRef(function ProductForm({ 
  productData,
  data,
  onSuccess, 
  onError,
  onSavingChange,
  onValidationChange,
  formRef
}, componentRef) {
  const [isSaving, setIsSaving] = React.useState(false);

  // Validation schema for product fields
  const validationSchema = Yup.object({
    title: Yup.string().required('Product name is required').max(30, 'Max 30 characters'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    // Prefer canonical `data` prop (passed from MDialogBox); fallback to
    // legacy `productData` prop for backward compatibility.
    initialValues: {
      title: data?.title ?? productData?.title ?? '',
      brand: data?.brand ?? productData?.brand ?? '',
      category: data?.category ?? productData?.category ?? '',
      description: data?.description ?? productData?.description ?? '',
    },
    validationSchema,                                                 
    onSubmit: async (values) => {
      const updated = { ...productData, ...values };
      setIsSaving(true);
      onSavingChange?.(true);

      try {
        // Call updateProduct API with productId and updated data
        const productId = data?.id ?? productData?.id;

        const apiResponse = await updateProduct({
          productId,
          updatedData: {
            title: values.title,
            brand: values.brand,
            category: values.category,
            description: values.description,
          },
        });

        // Merge API response with local product state
        const responseData = { ...(data ?? productData), ...apiResponse };
        onSuccess?.(responseData);
      } catch (error) {
        console.error('Error updating product:', error);
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
    <form onSubmit={formik.handleSubmit} id="edit-product-form" ref={formRef}>
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        id="title"
        name="title"
        label="Product Name"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        fullWidth
        margin="dense"
        id="brand"
        name="brand"
        label="Brand"
        value={formik.values.brand}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.brand && Boolean(formik.errors.brand)}
        helperText={formik.touched.brand && formik.errors.brand}
      />

      <TextField
        fullWidth
        margin="dense"
        id="category"
        name="category"
        label="Category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.category && Boolean(formik.errors.category)}
        helperText={formik.touched.category && formik.errors.category}
      />

      <TextField
        fullWidth
        margin="dense"
        id="description"
        name="description"
        label="Description"
        multiline
        rows={3}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
    </form>
  );
});
