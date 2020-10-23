import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spinner } from '../Spinner/Spinner';

import { useTheme } from '../../contexts/themeContext/ThemeContext';
import { useTranslationContext } from '../../contexts/translationContext/TranslationContext';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
  },
});

const LoadingIndicatorWrapper: React.FC<{ text: string }> = ({ text }) => {
  const {
    theme: {
      loadingIndicator: { container, loadingText },
    },
  } = useTheme();

  return (
    <View style={[styles.container, container]}>
      <Spinner />
      <Text style={[styles.loadingText, loadingText]} testID='loading'>
        {text}
      </Text>
    </View>
  );
};

export type LoadingProps = {
  listType?: 'channel' | 'message' | 'default';
  loadingText?: string;
};

/**
 * UI Component for LoadingIndicator
 *
 * @example ./LoadingIndicator.md
 */
export const LoadingIndicator: React.FC<LoadingProps> = (props) => {
  const { listType, loadingText } = props;

  const { t } = useTranslationContext();

  if (loadingText) {
    return <LoadingIndicatorWrapper text={loadingText} />;
  }

  switch (listType) {
    case 'channel':
      return <LoadingIndicatorWrapper text={t('Loading channels ...')} />;
    case 'message':
      return <LoadingIndicatorWrapper text={t('Loading messages ...')} />;
    default:
      return <LoadingIndicatorWrapper text={t('Loading ...')} />;
  }
};

LoadingIndicator.displayName = 'LoadingIndicator{loadingIndicator}';