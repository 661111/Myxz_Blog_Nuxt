---
title: 音乐搭建
description: 该文章主要写了对于低价机器的试水，并提醒是超开类型的机器。在测试的过程中发现机器性能较高，且展示出机器的具体价格，并单独列出只有精简版未采用完整版测试。
date: 2026-02-03 10:00:00
updated: 2026-02-04 20:49:00
image: /image/PostCover/vpsTalk.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---
已很少使用，正好闲置利用。  


## 安装过程  
1. 首先下载飞牛OS系统镜像，等待下载完成。  
::pic  
---  
src: /image/PostInternal/2026/fnosInstallPost/fnosISO.png  
caption: 飞牛OS下载指引  
---  
::  

2. 使用刻录软件将镜像刻录至U盘。  
3. 启动安装盘：不同厂商主板需查询进入BIOS/UEFI的快捷键，苹果主板需长按Option键。  
4. 按官方教程操作，部分步骤可自定义。需注意网卡适配问题：若未显示网卡，说明当前主板型号未适配，需外接网线。  


## 问题  
折腾过程中遇到两个棘手问题，通过参考网友方案解决如下。  

### 网卡问题  
即便Intel版MacBook Air也卡在了网卡驱动上，适配过程颇为曲折。因手机端适配不佳，多数UI界面无法完整显示，最终只能通过图形化界面操作。后在飞牛社区找到以下脚本，实测可正常启用无线网卡。  

```bash [broadcom.sh]  
cd /tmp  
wget https://mirrors.tuna.tsinghua.edu.cn/debian/pool/non-free/b/broadcom-sta/broadcom-sta-dkms_6.30.223.271-23_all.deb  
mkdir /usr/src/linux-headers-6.12.18-trim/include/asm  
ln -s /usr/src/linux-headers-6.12.18-trim/include/linux/unaligned.h /usr/src/linux-headers-6.12.18-trim/include/asm/unaligned.h  
apt update  
dpkg -i --force-all broadcom-sta-dkms_6.30.223.271-23_all.deb  
apt install -f  
apt install dkms --reinstall  
apt install wpasupplicant --reinstall  
apt install wireless-tools --reinstall  
apt install firmware-brcm80211 --reinstall  
modprobe -r b44 b43 b43legacy ssb brcmfmac brcmsmac bcma  
modprobe wl  
```  

执行后输入 `ip addr show`，找到以 `192.168` 开头且后缀为 `/24` 的IP地址（示例如下），在浏览器中输入该IP（可加端口，系统会自动索引）。  

```sh  
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000  
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00  
    inet 127.0.0.1/8 scope host lo  
       valid_lft forever preferred_lft forever  
    inet6 ::1/128 scope host noprefixroute  
       valid_lft forever preferred_lft forever  
2: wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000  
    link/ether 64:76:ba:94:5a:fc brd ff:ff:ff:ff:ff:ff  
    inet 192.168.2.103/24 brd 192.168.2.255 scope global dynamic noprefixroute wlp3s0  
       valid_lft 4551sec preferred_lft 4551sec  
    inet6 fe80::6976:9ac6:be26:376a/64 scope link noprefixroute  
       valid_lft forever preferred_lft forever  
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default  
    link/ether 32:9f:f2:23:e8:e0 brd ff:ff:ff:ff:ff:ff  
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0  
       valid_lft forever preferred_lft forever  
4: br-94ae747f53fe: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default  
    link/ether 9a:de:88:f3:a6:f9 brd ff:ff:ff:ff:ff:ff  
    inet 172.18.0.1/16 brd 172.18.255.255 scope global br-94ae747f53fe  
       valid_lft forever preferred_lft forever  
5: br-bb59faa45d6a: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default  
    link/ether ee:c1:bb:75:bd:22 brd ff:ff:ff:ff:ff:ff  
    inet 172.19.0.1/16 brd 172.19.255.255 scope global br-bb59faa45d6a  
       valid_lft forever preferred_lft forever  
    inet6 fe80::ecc1:bbff:fe75:bd22/64 scope link  
       valid_lft forever preferred_lft forever  
6: veth585ba6d@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-bb59faa45d6a state UP group default  
    link/ether d2:b0:d3:e7:85:55 brd ff:ff:ff:ff:ff:ff link-netnsid 0  
    inet6 fe80::d0b0:d3ff:fee7:8555/64 scope link  
       valid_lft forever preferred_lft forever  
7: vethdcb55a8@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-bb59faa45d6a state UP group default  
    link/ether 76:a3:52:ab:c9:15 brd ff:ff:ff:ff:ff:ff link-netnsid 1  
    inet6 fe80::74a3:52ff:feab:c915/64 scope link  
       valid_lft forever preferred_lft forever  
8: vetheee5619@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-bb59faa45d6a state UP group default  
    link/ether d2:41:20:8d:14:92 brd ff:ff:ff:ff:ff:ff link-netnsid 2  
    inet6 fe80::d041:20ff:fe8d:1492/64 scope link  
       valid_lft forever preferred_lft forever  
9: veth57bf76c@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-bb59faa45d6a state UP group default  
    link/ether 5e:3c:9b:a4:58:c3 brd ff:ff:ff:ff:ff:ff link-netnsid 3  
    inet6 fe80::5c3c:9bff:fea4:58c3/64 scope link  
       valid_lft forever preferred_lft forever  
```  

### 启动问题  
耗时最久的是启动项异常——不少用户反馈过类似情况，有大佬指出根源在于苹果主板的BIOS/UEFI为魔改版本。2016年后苹果调整了引导逻辑（部分2016年前机型也存在此问题），导致启动时出现问号文件夹。解决方法如下：  
1. 插入Ventoy制作的启动U盘；  
2. 开机时长按Option键，进入引导界面；  
3. 选择“EFI Boot”；  
4. 进入Ventoy主界面后，勿选镜像文件，按下方提示按F4选择“Localboot”；  
5. 选择“Search and boot BOOTX64.EFI”；  
6. 此时可见“GNU/Debian Linux”选项，回车即可进入飞牛OS。  


## 基础功能  

### 详细信息  
在“设置-设备信息”中，可查看系统版本、设备名称与ID、飞牛账号登录/退出、远程连接、存储信息、硬件信息、网络信息等核心数据。  
::pic  
---  
src: /image/PostInternal/2026/fnosInstallPost/info.png  
caption: 设备详情信息  
---  
::  

### 存储空间  
对新手友好（多数国产NAS均有类似功能），分“存储空间”和“SSD缓存”两类。  
- **存储空间**：支持SSD（兼容NVMe、SATA、PCIe，前两者有M.2版本）和HDD（SATA、SAS），基本覆盖常见接口，非原厂设备也能识别硬盘。  

::tab{:tabs='["文件系统", "存储模式"]'}  
#tab1  
| 功能         | Btrfs | ZFS  | ext4 |  
|:------------:|:-----:|:----:|:----:|  
| 快照         | ✅支持 | ✅支持 | ❌不支持 |  
| 压缩         | ❌不支持 | ✅支持 | ❌不支持 |  
| 去重         | ❌不支持 | ✅支持 | ❌不支持 |  
| 稳定性       | 大规模存储与高负载下较弱 | 尚未知 | ✅强 |  
| 兼容性       | ❌不强 | ❌不强 | ✅强 |  
| 成熟度       | 未知 | 未知 | 未知 |  
| 数据保护     | 未知 | ✅强 | 未知 |  
| 错误自愈     | 未知 | ✅强 | 未知 |  
| 资源占用     | 未知 | ❌占用高（建议每TB配1GB内存，最低8GB起步） | 未知 |  
| 读写性能     | 未知 | 未知 | 中小文件读取优异 |  

#tab2  
| **存储模式** | **最少硬盘数** | **容量计算**         | **优点**                                                                 | **缺点**                                                                 |  
|--------------|----------------|----------------------|--------------------------------------------------------------------------|--------------------------------------------------------------------------|  
| **Basic**    | 1块            | 单盘容量             | ① 单盘独立运行，操作简单；<br>② 扩容灵活（可改模式，文件不丢）         | ① 无冗余，坏盘即丢数据；<br>② 仅适单盘非关键场景                         |  
| **Linear**   | 2块及以上      | 所有盘容量之和       | ① 多盘累加容量，满足大存储；<br>② 支持后期加盘扩容                       | ① 读写等同单盘（无性能提升）；<br>② 无冗余，坏盘即丢数据                 |  
| **RAID 0**   | 2块及以上      | 所有盘容量之和       | ① 读写速度显著提升（理论单盘N倍，N为盘数）；<br>② 容量利用率100%         | ① 无冗余，坏盘即全丢；<br>② 不可扩容/改模式（需删重建）                  |  
| **RAID 1**   | 2块            | 单盘容量（总/盘数）   | ① 安全性高（双盘镜像，坏1块可恢复）；<br>② 支持热备盘替换                 | ① 容量利用率低（50%）；<br>② 重构耗时（升级时不可用）                    |  
| **RAID 5**   | 3块及以上      | 总容量-1块盘容量     | ① 兼顾容量与安全（允1块坏）；<br>② 利用率较高（约66%-80%）               | ① 写入略慢（需算奇偶校验）；<br>② 重构耗时（升级时不可用）                |  
| **RAID 6**   | 4块及以上      | 总容量-2块盘容量     | ① 安全性最高（允2块坏）；<br>② 适企业级关键数据                         | ① 利用率更低（约50%-66%）；<br>② 写入更慢（需算双重校验）                |  
| **RAID 10**  | 4块及以上（偶）| 总容量/2             | ① 性能安全兼顾（读写快，允2块坏）；<br>② 适高性能场景                     | ① 利用率低（50%）；<br>② 成本高（需更多盘）                              |  
::  

- **SSD缓存**：将未分配的SSD空间用作缓存，虽占空间但可提升设备响应速度。  

### 文件共享  
NAS核心功能，飞牛支持5种模式：`SMB`、`WebDav`、`FTP`、`NFS`、`DLNA`。  
- **需账户密码**：`SMB`、`WebDav`、`FTP`均支持，可设权限范围、自定义配置。  
- **免账户密码**：`NFS`特殊，无需账号但需谨慎开启并严格限制访问。  
- **设备定向**：`DLNA`供局域网内音响、电视等设备匿名访问指定多媒体文件。  


## 软件功能  
对小白而言，NAS的魅力在于“一键装套件”。飞牛内置丰富应用，安装后跳转浏览器即可便捷管理，降低上手门槛。