import ExpensiMark from 'expensify-common/lib/ExpensiMark';
import React, {useMemo, useState} from 'react';
import {View, Image} from 'react-native';
import {NavigationContext} from '@react-navigation/core';
import Composer from '../components/Composer';
import RenderHTML from '../components/RenderHTML';
import Text from '../components/Text';
import styles from '../styles/styles';
import themeColors from '../styles/themes/default';
import * as StyleUtils from '../styles/StyleUtils';
import CONST from '../CONST';

/**
 * We use the Component Story Format for writing stories. Follow the docs here:
 *
 * https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format
 */
const story = {
    title: 'Components/Composer',
    component: Composer,
};

const parser = new ExpensiMark();

function Default(args) {
    const [pastedFile, setPastedFile] = useState(null);
    const [comment, setComment] = useState(args.defaultValue);
    const renderedHTML = parser.replace(comment);
    const navigationContextValue = useMemo(() => ({addListener: () => () => {}, removeListener: () => () => {}}), []);

    return (
        <View>
            <View style={[styles.border, styles.p4]}>
                <NavigationContext.Provider value={navigationContextValue}>
                    <Composer
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...args}
                        multiline
                        textAlignVertical="top"
                        onChangeText={setComment}
                        onPasteFile={setPastedFile}
                        style={[styles.textInputCompose, styles.w100]}
                    />
                </NavigationContext.Provider>
            </View>
            <View style={[styles.flexRow, styles.mv5, styles.flexWrap, styles.w100]}>
                <View
                    style={[styles.border, styles.noLeftBorderRadius, styles.noRightBorderRadius, styles.p5, styles.flex1]}
                    nativeID={CONST.REPORT.DROP_NATIVE_ID}
                >
                    <Text style={[styles.mb2, styles.textLabelSupporting]}>Entered Comment (Drop Enabled)</Text>
                    <Text>{comment}</Text>
                </View>
                <View style={[styles.p5, styles.borderBottom, styles.borderRight, styles.borderTop, styles.flex1]}>
                    <Text style={[styles.mb2, styles.textLabelSupporting]}>Rendered Comment</Text>
                    {Boolean(renderedHTML) && <RenderHTML html={renderedHTML} />}
                    {Boolean(pastedFile) && (
                        <View style={styles.mv3}>
                            <Image
                                source={{uri: URL.createObjectURL(pastedFile)}}
                                resizeMode="contain"
                                style={StyleUtils.getWidthAndHeightStyle(250, 250)}
                            />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

Default.args = {
    autoFocus: true,
    placeholder: 'Compose Text Here',
    placeholderTextColor: themeColors.placeholderText,
    defaultValue: `Composer can do the following:

     * It can contain MD e.g. *bold* _italic_
     * Supports Pasted Images via Ctrl+V`,
    isDisabled: false,
    maxLines: 16,
};

export default story;
export {Default};
