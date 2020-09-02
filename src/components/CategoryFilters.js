import React from 'react'

class CategoryFilters extends React.Component {

    getCategories = () => {
        return this.props.categories.map(category => {
        return <button className={category === this.props.selectedCategory ? 'selected':undefined} onClick={() =>this.props.setCategory(category)} key={category}>{category}</button>
        })
    }

    render() {
        return (
            <div className="categories">
                <h5>Category filters</h5>
                {this.getCategories()}
            </div>
        )
    }
}

export default CategoryFilters