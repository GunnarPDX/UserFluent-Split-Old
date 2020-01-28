import "../forms.scss";
import React, { Component } from 'react'
import Dropzone from "react-dropzone";
import axios from 'axios';
import LoadingButton from "../../components/loader/LoadingButton";
import CategorySelect from "../../components/forms/CategorySelect";
import PlatformSelect from "../../components/forms/PlatformSelect";

class NewPost extends Component {

  state = {
      title: '',
      content: '',
      image: '',
      category: '',
      sub_category: '',
      loading: 'false',
      image_file: null,
      image_preview: null,
  };

  onDrop = (files) => {
      window.URL.revokeObjectURL(this.state.image_preview);
      this.setState({ image_file: files[0], image_preview: URL.createObjectURL(files[0])  });
      //console.log(this.state.image_file.path);
  };

    showFilePreview() {

        const previewStyle = {
            height: '400px',
        };

        let file = this.state.image_preview || null;

        if (file === null) {
            return null;
        }

        return (
            <div className={"post-image-upload-overlay"}>
                <img
                    alt="Preview"
                    src={file}
                    style={previewStyle}
                />
            </div>
        );
    };

  handleChange = (e) => {
      let newValue = e.target.value;
      let key = e.target.name;
      this.setState({
          [key]: newValue,
          loading: 'false'
      });
  };

  handleSubmit = (e) => {
      e.preventDefault();
      this.setState({loading: 'true'});

      const { title, content, image_file } = this.state;
      let currentComponent = this;

      const formData = new FormData();
      formData.append('file', image_file);
      formData.append('upload_preset', 'r2rutyz6');

      const response = axios.post(
          `https://api.cloudinary.com/v1_1/dmqtrnawm/image/upload`,
          formData,
      ).then(function(response) {
          console.log(response);
          const image = response.data.public_id;
          currentComponent.setState({image: image});


          let data = {post: currentComponent.state};
          let token = document.querySelector('meta[name="csrf-token"]').content;
          fetch('api/v1/posts', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  'X-Requested-With': 'XMLHttpRequest',
                  'X-CSRF-Token': token
              },
              redirect: "error",
              body: JSON.stringify(currentComponent.state)
          })
              .then(resp => {
                  resp.json()
              })
              .then(resp => {
                  currentComponent.setState({loading: 'success'});
                  currentComponent.props.history.push('/');
              });
      });
  };

  contentBoxStyle = {
      width: '90%',
  };

  render() {
      let props = {
          loading: this.state.loading,
          form: 'new-post-form',
          button_title: 'Submit New Post!',
      };

      return (
          <div className={"uf-fade-in"}>
              <div className={"content-spacer"}/>

              <div className={"settings-container"}>
                  <Dropzone onDrop={this.onDrop}>
                      {({getRootProps, getInputProps}) => (
                          <section>
                              <div {...getRootProps()} className={"dropzone"}>
                                  <input {...getInputProps()} />

                                  <div className={"dropzone-text"}>
                                      Drag and drop some files here, or click to select files.
                                      <br/>
                                      [Max file size: 10mb]
                                  </div>

                                  {this.showFilePreview()}

                              </div>
                          </section>
                      )}
                  </Dropzone>
              </div>

              <form onSubmit={this.handleSubmit.bind(this)} id={"new-post-form"}>

                  <div className={"settings-container"}>
                      <CategorySelect onSelect={this.handleChange}/>
                  </div>

                  <div className={"settings-container"}>
                      <PlatformSelect onSelect={this.handleChange}/>
                  </div>

                  <div className={"settings-container"}>
                      <div className={"form-row"}>
                          <label htmlFor="title" className={"form-field-title"}>Title </label>
                          <input type="text" name="title" onChange={this.handleChange} className={"uf-form-field form-right"}/>
                      </div>
                  </div>

                  <div className={"settings-container"}>
                      <div className={"form-row"}>
                          <label htmlFor="content" className={"form-field-title"}>Content </label>
                          <textarea name="content" id="" cols="30" rows="10" onChange={this.handleChange} className="settings-bio-text-area form-right"/>
                      </div>
                  </div>
              </form>

              <div className={"settings-container"}>
                  <LoadingButton {...props}/>
              </div>


          </div>
      )
  }
}

export default NewPost