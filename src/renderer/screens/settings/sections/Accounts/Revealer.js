// @flow

import React, { useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";
import { SettingsSectionRow } from "~/renderer/screens/settings/SettingsSection";
import { useDispatch } from "react-redux";

import Button from "~/renderer/components/Button";
import { openModal } from "~/renderer/actions/modals";

const Revealer = () => {
  const dispatch = useDispatch();

  const getStarted = useCallback(() => {
    dispatch(openModal("MODAL_REVEALER"));
  }, []);

  const { t } = useTranslation();
  return (
    <>
      <SettingsSectionRow
        title={t("settings.revealer.title")}
        desc={t("settings.revealer.desc")}
      >
        <Button onClick={getStarted} primary>
          <Trans i18nKey={t("settings.revealer.getStarted")} />
        </Button>
      </SettingsSectionRow>
    </>
  );
};

export default Revealer;
