const Switch = ({ className, id, name, onChange, label, checked, disabled }) => {
    return ( 
        <>
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={id}
                    defaultChecked={checked ? checked : false}
                    disabled={disabled ? disabled : false}
                />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </>
     );
}
 
export default Switch;