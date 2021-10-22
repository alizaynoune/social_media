import React, { useEffect, useState } from 'react'
import { Input, Form, DatePicker, Select, Upload, message, Modal, Space, InputNumber } from 'antd'
import { UserOutlined, LoadingOutlined, PlusOutlined, PhoneOutlined } from '@ant-design/icons'
import moment from 'moment'

const { Option } = Select
const FormUseDetailComponent = (props) => {
  const {
    step,
    values, setValues,
    errors, setErrors,
    stepStatus, setStepStatus
  } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [countryPhoneCode, setCountryPhoneCode] = useState({
    data: [
      {
        "id": "1",
        "name": "Viet Nam",
        "country_code": "VN",
        "phone_code": "84",
        "country_flag": "https://cdn.countryflags.com/thumbs/vietnam/flag-400.png",
      },
      {
        "id": "2",
        "name": "United States",
        "country_code": "US",
        "phone_code": "1",
        "country_flag": "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png",
      },
      {
        "id": "3",
        "name": "United Kingdom",
        "country_code": "GB",
        "phone_code": "44",
        "country_flag": "https://cdn.countryflags.com/thumbs/united-kingdom/flag-400.png",
      },
      {
        "id": "4",
        "name": "Morocco",
        "country_code": "MA",
        "phone_code": "212",
        "country_flag": "https://cdn.countryflags.com/thumbs/morocco/flag-400.png",
      },
    ],
  });


  function disabledDate(current) {
    return current && current > moment(moment().year() - 18 + '-' + moment().month() + '-' + moment().date()).endOf('day');
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const uploadButton = (
    <div>
      {values.imageUrl ? <img src={values.imageUrl} alt="avatar" style={{ width: '100%' }} /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    console.log('[', values.imageUrl, ']values.imageUrl')
  }, [values])

  const selectCountry = (
    <Select
      showSearch
      style={{ width: 90 }}
      // onChange={(value) => {
      //   setValues({ ...values, country: value })
      // }}
    >
      {countryPhoneCode.data.map((item, index) => (
        <Option key={index} value={item.phone_code}>
          <img src={item.country_flag} alt="flag" style={{ width: '20px', marginRight: '5px' }} />
          {item.country_code}
        </Option>
      ))}
    </Select>
  );


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

          onChange={async (value) => {
            await setValues({ ...values, gander: value })
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
            action=""
            listType="picture-card"
            defaultFileList={values.thumbUrl}
            onPreview={() => { setPreviewVisible(true) }}
            maxCount={1}
            customRequest={({ e, onSuccess }) => { onSuccess('ok') }}
            onChange={(info) => {
              if (info.file.status === 'removed') {
                setValues({ ...values, avatar: '', thumbUrl: '' })
              } else {
                getBase64(info.file.originFileObj, (imageUrl) => {
                  setValues({ ...values, avatar: imageUrl, thumbUrl: info.fileList })
                });
              }
            }}
          >
            {values.avatar ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={() => { setPreviewVisible(false) }}>
            {values.avatar ? <img alt="example" style={{ width: '100%' }} src={values.avatar} /> : null}
          </Modal>
        </div>
      </Form.Item >
      <Form.Item
        name="phoneNumber"
      >
        <Space direction="vertical">
          <Input addonBefore={selectCountry} placeholder="Phone" value={values.country} />

        </Space>

      </Form.Item>

    </>
  )
}

export default FormUseDetailComponent

