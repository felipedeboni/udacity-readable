import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';

const PostForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    categories,
    post = {}
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{post.id ? 'Edit' : 'Add'} Post</h2>
      <div
        className={`form-group ${errors.category &&
          touched.category &&
          'has-error'}`}
      >
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="form-control"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Choose a category</option>
          {categories.map((category, i) => (
            <option key={i} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category &&
          touched.category && (
            <label className="control-label">{errors.category}</label>
          )}
      </div>

      <div
        className={`form-group ${errors.title && touched.title && 'has-error'}`}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className="form-control"
          placeholder="Title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.title &&
          touched.title && (
            <label className="control-label">{errors.title}</label>
          )}
      </div>

      <div
        className={`form-group ${errors.author &&
          touched.author &&
          'has-error'}`}
      >
        <label htmlFor="author">Author</label>
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
        <label htmlFor="body">Post Content</label>
        <textarea
          id="body"
          name="body"
          className="form-control"
          placeholder="Post Content"
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
          {post.id ? 'Save' : 'Add'} Post
        </button>
      </div>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: ({
    post = { category: '', title: '', author: '', body: '' }
  }) => ({
    category: post.category,
    title: post.title,
    author: post.author,
    body: post.body
  }),
  validationSchema: Yup.object().shape({
    category: Yup.string().required('Please enter a category.'),
    title: Yup.string().required('Please enter a title.'),
    author: Yup.string().required('Please enter an author.'),
    body: Yup.string().required('Please enter a post content.')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { onSubmitHandler } = props;
    onSubmitHandler(values);
  },
  enableReinitialize: true
})(PostForm);
