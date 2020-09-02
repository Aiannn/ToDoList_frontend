import React from 'react'

class StretchToggle extends React.Component {
    render () {
        return <button onClick={this.props.switchStretchFeatures} className={this.props.showStretchFeatures? 'toggle on': 'toggle off'}>{this.props.showStretchFeatures? 'Stretch features enabled': 'Stretch features disabled'}</button>
    }
}

export default StretchToggle