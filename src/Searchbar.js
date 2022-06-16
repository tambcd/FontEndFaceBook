import React from 'react';

class Searchbar extends React.Component {
    handleChange = (event) => {
        this.setState({
            term: event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }

    render() {

        return (
            <>
                <div >
                    <form onSubmit={this.handleSubmit} className='ui form'>
                        <div class="search-box" >
                            <input onChange={this.handleChange} name='video-search' className="search-bar" type="text" placeholder="Search.." />
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
export default Searchbar;