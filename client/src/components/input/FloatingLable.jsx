import React, {useState} from 'react'

function FloatingLable(props) {
    const [focus, setFocus] = useState(false);
    const { children, label, value } = props;
  
    const labelClass =
      focus || (value && value.length !== 0) ? "label label-float" : "label";
    
    console.log(children.props.value);
  
    return (
      <div
        className="float-label"
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      >
        {children}
        <label className={labelClass}>{label}</label>
      </div>
    );
}

export { FloatingLable }
