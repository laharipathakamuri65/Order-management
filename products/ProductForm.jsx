import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../src/store/productsSlice';
import Grid from '@mui/material/Grid';

// ProductForm component - handles product editing with Formik validation
// Props:
// - productData: object (product to edit)
// - onSuccess: function(responseData) - called on successful API response
// - onError: function(error) - called on API error
// - onSavingChange: function(isSaving) - called to update parent loading state
// - onValidationChange: function(isValid) - called when validation state changes
// - formRef: React ref - ref to the form element for triggering submission
export default React.forwardRef(function ProductForm({ 
  data,
  onSuccess, 
  onError,
  onSavingChange,
  onValidationChange,
  formRef,
  mode = 'edit'
}, componentRef) {
  console.log('ProductForm data prop:', data);
  const [isSaving, setIsSaving] = React.useState(false);
  const categories = useSelector(state => state.productscategorylist?.items || []);
  const categoriesLoading = useSelector(state => state.productscategorylist?.loading);

console.log('ProductForm categories:', categories);
  // Validation schema for product fields (recomputed when `mode` changes)
  const validationSchema = React.useMemo(() => Yup.object({
    title: Yup.string().required('Product name is required').max(30, 'Max 30 characters'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    category2: mode === 'add' ? Yup.string().required('Category2 is required') : Yup.string(),
    description: Yup.string().required('Description is required'),
  }), [mode]);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    // Prefer canonical `data` prop (passed from MDialogBox); fallback to
    // legacy `productData` prop for backward compatibility.
    initialValues: {
      title: data?.title ?? data?.title ?? '',
      brand: data?.brand ?? data?.brand ?? '',
      category: data?.category ?? data?.category ?? '',
      category2: data?.category2 ?? data?.category2 ?? '',
      description: data?.description ?? data?.description ?? '',
    },
    validationSchema,                                                 
    onSubmit: async (values) => { // Formik submit handler: merge values and delegate update to parent
      const updated = { ...data, ...values };
      setIsSaving(true);
      onSavingChange?.(true);

      try {
        // Delegate API update to the parent (page) so it can dispatch
        // the Redux thunk `updateProduct`. Notify parent of the updated
        // product object via onSuccess.
        onSuccess?.(updated);
      } catch (error) {
        console.error('Error in ProductForm submit:', error);
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

  // local state for category2 options when adding
  const [category2Options, setCategory2Options] = React.useState([]);
  const dispatch = useDispatch();
  const isReadOnly = mode === 'view';

  // when in add mode, listen for changes to category and fetch related items
  React.useEffect(() => {
    if (mode !== 'add') return;
    const cat = formik.values.category;
    if (!cat) {
      setCategory2Options([]);
      return;
    }
    // dispatch fetchProductsByCategory and use result to populate category2 options
    (async () => {
      try {
        const resultAction = await dispatch(fetchProductsByCategory(cat));
        const payload = resultAction.payload ?? [];
        // map payload to strings (use title)
        const opts = payload.map(p => (typeof p === 'string' ? p : p.title || p));
        setCategory2Options(opts);
      } catch (err) {
        console.error('Failed to fetch category items:', err);
        setCategory2Options([]);
      }
    })();
  }, [mode, formik.values.category, dispatch]);

  return (
    <form onSubmit={formik.handleSubmit} id="edit-product-form" ref={formRef}>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>

        <Grid item xs={12} md={12}>
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
            disabled={isReadOnly}
          />
        </Grid>

        <Grid item xs={12} md={12}>
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
            disabled={isReadOnly}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Autocomplete
            disablePortal
            options={categories}
            getOptionLabel={(option) => (typeof option === 'string' ? option : String(option))}
            isOptionEqualToValue={(option, value) => option === value}
            value={formik.values.category || null}
            onChange={(event, value) => {
              formik.setFieldValue('category', value ?? '');
            }}
            onBlur={() => formik.setFieldTouched('category', true)}
            loading={categoriesLoading}
            disabled={isReadOnly}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="dense"
                id="category"
                name="category"
                label="Category"
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              />
            )}
          />
        </Grid>

        {mode === 'add' && (
          <Grid item xs={12} md={12}>
            <Autocomplete
              disablePortal
              options={category2Options}
              getOptionLabel={(option) => (typeof option === 'string' ? option : String(option))}
              isOptionEqualToValue={(option, value) => option === value}
              value={formik.values.category2 || null}
              onChange={(e, value) => formik.setFieldValue('category2', value ?? '')}
              onBlur={() => formik.setFieldTouched('category2', true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="dense"
                  id="category2"
                  name="category2"
                  label="Category2"
                  error={formik.touched.category2 && Boolean(formik.errors.category2)}
                  helperText={formik.touched.category2 && formik.errors.category2}
                  disabled={isReadOnly}
                />
              )}
            />
          </Grid>
        )}

        <Grid item xs={12} md={12}>
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
            disabled={isReadOnly}
          />
        </Grid>

      </Grid>
    </form>
  );
});
