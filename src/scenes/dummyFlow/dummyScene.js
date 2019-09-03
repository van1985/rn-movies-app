import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import DummyComponent from "../../components/dummyComponent";
import { search } from "../../reducers/dummy/dummyActions";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
});

class dummyScene extends Component {
    static navigationOptions = {
        title: "DummyScene"
    };

    componentDidMount() {
        this.props.onSearch("avenger");
    }

    render() {
        const { searchResult } = this.props;
        return (
            <View style={styles.wrapper}>
                <DummyComponent />
                <Text>${JSON.stringify(searchResult)}`)</Text>
            </View>
        );
    }
}

export default connect(
    state => ({ searchResult: state.search }),
    {
        onSearch: search
    }
)(dummyScene);
