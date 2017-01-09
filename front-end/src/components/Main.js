require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

class Navbar extends React.Component {

    render() {

        let navList = [];

        this.props.data.forEach((data) => {

            let liClassName = '';
            liClassName += data.isActive ? 'active' : '';
            navList.push(<li key={data.name} className={liClassName}><a>{data.title}</a></li>)
        })

        return (
            <nav className="navbar">
                <ul className="nav">
                    {navList}
                </ul>
            </nav>
        );
    }
}

class AppComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            navData: [{
                name: 'home',
                title: '首页',
                isActive: true
            }, {
                name: 'article',
                title: '我的推送',
                isActive: false
            }, {
                name: 'display',
                title: '作品展示',
                isActive: false
            }, {
                name: 'aboutme',
                title: '关于我',
                isActive: false
            }]
        };
    }

    render() {

        let navData = this.state.navData;

        return (

            <Navbar data={navData}/>
        )
    }

    _renderPage() {
        if (this.state.nav = 'home') {
            return <HomePage />;
        }
        if (this.state.nav = 'aboutme') {
            return <AboutmePage />;
        }
        if (this.state.nav = 'display') {
            return <DisplayPage />;
        }
        if (this.state.nav = 'article') {
            return <ArticlePage />;
        }
    }
}

AppComponent.defaultProps = {};

export default AppComponent;