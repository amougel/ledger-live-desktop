// @flow
import React, {useCallback} from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
// icons
import IconHelp from "~/renderer/icons/Help";
import IconBook from "~/renderer/icons/Book";
import IconNano from "~/renderer/icons/NanoAltSmall";
import IconDownloadCloud from "~/renderer/icons/DownloadCloud";
import IconChevronRight from "~/renderer/icons/ChevronRight";
import Text from "~/renderer/components/Text";
import TrackPage from "~/renderer/analytics/TrackPage";
import { SideDrawer } from "~/renderer/components/SideDrawer";
import Box from "~/renderer/components/Box";
import resolveUserDataDirectory from "~/helpers/resolveUserDataDirectory.js";
import { ipcRenderer, remote } from "electron";

import path from "path";
import fs from "fs";
import moment from "moment";
import { openURL } from "~/renderer/linking";
import { urls } from "~/config/urls";
import { hardReset, reload } from "~/renderer/reset";
import rimraf from "rimraf";
import { TopBannerContainer } from "~/renderer/screens/dashboard";
import Alert from "~/renderer/components/Alert";
import { command } from "~/renderer/commands";

const userDataPath = resolveUserDataDirectory();
const userDataFile = path.resolve(userDataPath, "app.json");


const ItemContainer = styled.a`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  text-decoration: none;
  &:not(:last-child) {
    border-bottom: 1px solid ${p => p.theme.colors.palette.divider};
  }
  & ${Box} svg {
    color: ${p => p.theme.colors.palette.text.shade50};
  }
  &:hover {
    filter: brightness(85%);
  }
  &:active {
    filter: brightness(60%);
  }
`;
const IconContainer = styled.div`
  color: ${p => p.theme.colors.palette.primary.main};
  display: flex;
  align-items: center;
`;
const sub = command("dropBox")({ }).subscribe({
  complete: () => console.log("finished rendererdropbox"),
  error: error => console.log("oops rendererdropbox", error),
  next: e => console.log("event rendererdropbox", e),
});

/*
renderer:
    const sub = command("toto")({ ...any parameters that can be serialized... }).subscribe({
      complete: () => console.log("finished"),
      error: error => console.log("oops", error),
      next: e => console.log("event", e),
    });
    // sub.unsubscribe()  permet de close côté renderer*/

const Item = ({
  Icon,
  title,
  desc,
  onClick,
}: {
  Icon: any,
  title: string,
  desc: string,
  onClick: () => void,
}) => {
  return (
    <ItemContainer onClick={onClick}>
      <IconContainer>
        <Icon size={24} />
      </IconContainer>
      <Box ml={12} flex={1}>
        <Text ff="Inter|SemiBold" fontSize={4} color={"palette.text.shade100"}>
          {title}
        </Text>
        <Text ff="Inter|Regular" fontSize={3} color={"palette.text.shade60"}>
          {desc}
        </Text>
      </Box>
      <Box>
        <IconChevronRight size={12} />
      </Box>
    </ItemContainer>
  );
};

const Item2 = ({
  Icon,
  title,
  desc,
  url,
}: {
  Icon: any,
  title: string,
  desc: string,
  url: string,
}) => {
  return (
    <ItemContainer onClick={() => openURL(url)}>
      <IconContainer>
        <Icon size={24} />
      </IconContainer>
      <Box ml={12} flex={1}>
        <Text ff="Inter|SemiBold" fontSize={4} color={"palette.text.shade100"}>
          {title}
        </Text>
        <Text ff="Inter|Regular" fontSize={3} color={"palette.text.shade60"}>
          {desc}
        </Text>
      </Box>
      <Box>
        <IconChevronRight size={12} />
      </Box>
    </ItemContainer>
  );
};

const BackupSideDrawer = ({ isOpened, onClose }: { isOpened: boolean, onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <SideDrawer isOpen={isOpened} onRequestClose={onClose} direction="left">
      <>
        <TrackPage category="SideDrawer" name="Help" />

        <Box py={60} px={40}>
          <Text ff="Inter|SemiBold" fontSize={22} mb={20} color={"palette.text.shade100"}>
            Live in the Cloud
          </Text>
          <Alert type="warning" style={{ flexGrow: 0 }}>
            <Text>
              For security reason, make sure that you have passwordlock enabled for you app before
              generating the backup file
            </Text>
          </Alert>
          <ItemContainer>
            <Item
              onClick={async () => {
                const toPath = await remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
                  title: "Exported user data",
                  defaultPath: `backup-Ledger-Live-${moment().format("YYYY.MM.DD")}.json`,
                  filters: [
                    {
                      name: "json Files",
                      extensions: ["json"],
                    },
                  ],
                });
                if (toPath) {
                  ipcRenderer.invoke("export-backup", userDataFile, toPath);
                }
              }}
              title={t("Back up your Live")}
              desc={t("Save your data locally")}
              Icon={IconBook}
            />
          </ItemContainer>
          <ItemContainer>
            <Item
              onClick={async () => {
                const backupFile = await remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
                  title: "Backup file to import",
                  properties: ["openFile"],
                  filters: [
                    {
                      name: "json Files",
                      extensions: ["json"],
                    },
                  ],
                });
                await hardReset();
                await rimraf(userDataPath, function() {
                  console.log("user data deleted");
                });
                await fs.mkdir(userDataPath);
                await fs.copyFile(backupFile.filePaths[0], `${userDataPath}/app.json`, err => {
                  console.log("Error: ", err);
                });
                await reload();
              }}
              title={t("Restore your Live")}
              desc={t("Import your data live locally")}
              Icon={IconNano}
            />
          </ItemContainer>
          <ItemContainer>
            <Item
              onClick={ () => {
              const crypto = require("crypto")
              const base64Encode = (str) => {
                return str.toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '');
            }
              const code_verifier = base64Encode(crypto.randomBytes(32));
              console.log(`Client generated code_verifier: ${codeVerifier}`)

              const sha256 = (buffer) => {
                return crypto.createHash('sha256').update(buffer).digest();
            }
              const code_challenge = base64Encode(sha256(code_verifier));
              //console.log(`Client generated code_challenge: ${codeChallenge}`)
              const base_url = "https://www.dropbox.com/oauth2/authorize?";
              const response_type = "code";
              const client_id = "ddj3449medpklop";
              const token_access_type = "offline";
              const code_challenge_method = "S256"
              const drop_url = base_url + "response_type=" + response_type
                             + "&client_id=" + client_id
                             + "&token_access_type=" + token_access_type
                             + "&code_challenge=" + code_challenge
                             + "&code_challenge_method=" + code_challenge_method
              openURL(drop_url);
              //onClick={() => openURL(url.toString())}
              }}
              
              title={t("Backup with Dropbox")}
              desc={t("Connect Live with your Dropbox account")}
              Icon={IconHelp}
              url={drop_url}
            />
          </ItemContainer>
        </Box>
      </>
    </SideDrawer>
  );
};
export default BackupSideDrawer;
