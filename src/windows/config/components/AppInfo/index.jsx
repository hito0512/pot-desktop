import { notification, app } from '@tauri-apps/api';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import ConfigList from '../ConfigList';
import ConfigItem from '../ConfigItem';

export default function AppInfo() {
    const [version, setVersion] = useState();
    const [tauriVersion, setTauriVersion] = useState();

    useEffect(() => {
        app.getVersion().then(v => { setVersion(v) })
        app.getTauriVersion().then(v => { setTauriVersion(v) })
    }, [])

    function checkUpdate() {
        axios.get('https://api.github.com/repos/Pylogmon/pot/releases/latest').then(
            res => {
                let remoteVersion = res.data['tag_name'];
                if (remoteVersion == version) {
                    notification.sendNotification({
                        title: '已经是最新版本了'
                    })
                } else {
                    notification.sendNotification({
                        title: '新版本可用',
                        body: `最新版本为：${remoteVersion}`,
                    })
                }
            },
            err => {
                notification.sendNotification({
                    title: '检查失败，请检查网络',
                    body: `${err}`
                })
            }
        )
    }

    return (
        <ConfigList label="应用信息">
            <ConfigItem label="应用版本">
                {`pot: ${version} tauri:${tauriVersion}   `}
                <Button onClick={checkUpdate}>检查更新</Button>
                <a href='https://github.com/Pylogmon/pot/releases' target="_blank"><Button>前往下载</Button></a>
            </ConfigItem>
        </ConfigList>
    )
}
