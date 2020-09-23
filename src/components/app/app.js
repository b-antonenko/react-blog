import React from 'react';
import AppHeader from '../app-header/app-header'
import SearchPanel from '../search-panel/search-panel'
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form'

import './app.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'Im going to learn React', important: true, like: false, id: 1},
                {label: 'Im going to learn CS', important: false, like: false, id: 2},
                {label: 'What a crazy day', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem=this.addItem.bind(this);
        this.onToggleImportant=this.onToggleImportant.bind(this);
        this.onToggleLiked=this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.idMax = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(element => element.id === id);
            let newArr = [...data.slice(0, index), ...data.slice(index+1)];

            return {
                data: newArr
            }
        })
    }

    addItem(text) {
        const newItem = {
            label: text,
            important: false,
            id: this.idMax++
        };

        this.setState(({data}) => {
            let newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(element => element.id === id);
            const oldObj = data[index];

            const newObj = {...oldObj, important: !oldObj.important};

            const newArr =[...data.slice(0,index), newObj, ...data.slice(index+1)];

            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(element => element.id === id);
            const oldObj = data[index];

            const newObj = {...oldObj, like: !oldObj.like};

            const newArr =[...data.slice(0,index), newObj, ...data.slice(index+1)];

            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0 ) {
            return items;
        }
        return items.filter(item => {
            return item.label.indexOf(term) > -1;
        })
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else
            return items;
    }

    onFilterSelect (filter) {
        this.setState({filter})
    }


    render() {
        const likedAmount = this.state.data.filter(item => item.like).length;
        const postsAmount = this.state.data.length;

        const visiblePosts = this.filterPost(this.searchPost(this.state.data, this.state.term), this.state.filter);

        return (
            <div className='app'>
                < AppHeader
                    likedAmount={likedAmount}
                    postsAmount={postsAmount}
                />
                <div className='search-panel d-flex' >
                    < SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={this.state.filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                < PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                < PostAddForm
                onAdd={this.addItem}
                />
            </div>
        )
    }
};