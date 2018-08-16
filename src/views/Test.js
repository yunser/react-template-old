import React, { Component } from 'react'

class Test extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            show: props.show,
        }
        // this.userId = options.match.params.id
    }

    

    render() {
        return (
            <div className="">
                <div>
                    测试
                    {this.state.show}
                </div>
            </div>
        )
    }
}

export default Test
