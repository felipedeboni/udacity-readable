import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';

export const PureCommentForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    comment = {}
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      {comment.id && <h2>Edit Comment</h2>}
      <div
        className={`form-group ${errors.author &&
          touched.author &&
          'has-error'}`}
      >
        <label htmlFor="author" className={comment.id ? '' : 'sr-only'}>
          Author
        </label>
        <input
          id="author"
          type="text"
          name="author"
          className="form-control"
          placeholder="Author"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.author &&
          touched.author && (
            <label className="control-label">{errors.author}</label>
          )}
      </div>

      <div
        className={`form-group ${errors.body && touched.body && 'has-error'}`}
      >
        <label htmlFor="comment" className={comment.id ? '' : 'sr-only'}>
          Comment
        </label>
        <textarea
          id="comment"
          name="body"
          className="form-control"
          placeholder="Comment"
          value={values.body}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.body &&
          touched.body && (
            <label className="control-label">{errors.body}</label>
          )}
      </div>

      <div className="text-right">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {comment.id ? 'Save' : 'Add'} Comment
        </button>
      </div>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: ({ comment = { author: '', body: '' } }) => ({
    author: comment.author,
    body: comment.body
  }),
  validationSchema: Yup.object().shape({
    author: Yup.string().required('Please enter an author.'),
    body: Yup.string().required('Please enter a comment.')
  }),
  handleSubmit: (values, { resetForm, setSubmitting, props }) => {
    const { onSubmitHandler } = props;
    onSubmitHandler(values).then(() => {
      if (!props.comment || !props.comment.id) {
        resetForm();
      }
    });
  },
  enableReinitialize: true
})(PureCommentForm);
