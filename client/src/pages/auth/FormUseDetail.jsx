import React, { useEffect, useState } from 'react'
import { Input, Form, DatePicker, Select, Upload, message, Modal } from 'antd'
import { UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
const FormUseDetailComponent = (props) => {
  const {
    step,
    values, setValues,
    errors, setErrors,
    stepStatus, setStepStatus
  } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);


  function disabledDate(current) {
    return current && current > moment(moment().year() - 18 + '-' + moment().month() + '-' + moment().date()).endOf('day');
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setValues({ ...values, [name]: value })
    console.log(e.target)
  }

  const uploadButton = (
    <div>
      {loading ? values.avatar === '' ? <LoadingOutlined /> : <img src={values.avatar} />  : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = () => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    console.log(values.avatar, 'values.avatar')

    setPreviewVisible(true);
  };


  const handleClose = () => {
    setPreviewVisible(false);
  };

  useEffect(() => {
    console.log(values.avatar, 'values.avatar')
  }, [values.avatar])
  return (
    <>
      <Form.Item
        name="birthday"
      >
        <DatePicker
          value={values.birthday}
          name="birthday"
          placeholder="Birth Date"
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          onChange={(date, dateString) => {
            setValues({ ...values, birthday: dateString })
          }}
        />
      </Form.Item>
      <Form.Item
        name="gander"
      >
        <Select
          value={values.gander}
          name="gander"
          placeholder="Gander"

          onChange={(value) => {
            setValues({ ...values, gander: value })
          }}
        >
          <Select.Option value="m">male</Select.Option>
          <Select.Option value="f">female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="avatar"
      >
        <div className="clearfix">
          <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            // fileList={values.avatar}
            // defaultFileList={[values.avatar]}
            onPreview={handlePreview}
            maxCount={1}
            onRemove={() => {
              setValues({ ...values, avatar: '' })
              
            }}
            beforeUpload={(file) => {
              setLoading(true);
              getBase64(file, (imageBase64) => {
                console.log(imageBase64, 'file')
                setLoading(false);
                setValues({ ...values, avatar: imageBase64 })
              })
              return false;
            }}
            onChange={(info) => {
              // getBase64(info.file.originFileObj, imageUrl => {

              console.log(info.file.originFileObj, 'info')
              // getBase64(info.file.originFileObj, imageUrl => {
              //   setValues({ ...values, avatar: imageUrl })
              // });
            }}
          >
            {values.avatar ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleClose}>
            {values.avatar ? <img alt="example" style={{ width: '100%' }} src={values.avatar} /> : null}
          </Modal>
        </div>
      </Form.Item >

    </>
  )
}

export default FormUseDetailComponent





// import React, { Component } from 'react'
// import { Upload, Modal } from 'antd';


// export default class FormUseDetailComponent extends Component {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     fileList: [{
//       uid: -1,
//       name: 'xxx.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     }],
//   };

//   handleCancel = () => this.setState({ previewVisible: false })

//   handlePreview = (file) => {
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true,
//     });
//   }

//   handleChange = ({ fileList }) => this.setState({ fileList })

//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const uploadButton = (
//       <div>
//         {/* <Icon type="plus" /> */}
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix">
//         <Upload
//           action="//jsonplaceholder.typicode.com/posts/"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 3 ? null : uploadButton}
//         </Upload>
//         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }
// }
