import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { Images, Metrics } from '../Themes'
import Onboarding from 'react-native-onboarding-swiper';

export default class OnboardingScreen extends React.Component {

  static propTypes = {
      onDone: PropTypes.func.isRequired
  };

  _onDone = () => {
    if (this.props.onDone) {
      this.props.onDone();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Onboarding
          showSkip={false}
          onDone= {this._onDone}
          pages={[
            {
              backgroundColor: '#fff',
              image: <Image style={styles.contentImage} source={Images.main} />,
              title: 'New York Times browser',
              subtitle: 'Search for New York Times articles using any search term or category.',
            },
            {
              backgroundColor: '#fff',
              image: <Image style={styles.contentImage} source={Images.article} />,
              title: 'In-app article view',
              subtitle: 'Read your articles without leaving the app.',
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentImage: {
    height: Metrics.images.logo*2,
    width: Metrics.images.logo,
    borderRadius: 15
  }
});
