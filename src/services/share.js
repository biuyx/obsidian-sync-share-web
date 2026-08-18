// export async function getMenuTest2() {
//     return request({
//         url: "/cosy/menuTest2",
//         method: "post",
//         data: {
//             name: 1,
//         },
//     });
// }

// export default null;

export default async function getNoteContent(username, shareLinkId, link) {
    return fetch(`/api/share/content/${username}/${shareLinkId}${link ? "?link=" + link : ""}`, { method: "GET" }).then(async (res) => {
        const titleHeader = res.headers.get("title");
        const title = titleHeader ? decodeURIComponent(titleHeader) : "";
        return [title, await res.text()];
    });
}

export async function getFolderContent(username, shareLinkId) {
    return fetch(`/api/share/folderContent/${username}/${shareLinkId}`, { method: "GET" }).then(async (res) => {
        if (!res.ok) {
            return null;
        }
        try {
            const data = await res.json();
            if (Array.isArray(data)) {
                let title = "";
                try {
                    title = decodeURIComponent(res.headers.get("title") || "");
                } catch (e) { /* ignore */ }
                return { files: data, title };
            }
            return null;
        } catch (e) {
            return null;
        }
    });
}
