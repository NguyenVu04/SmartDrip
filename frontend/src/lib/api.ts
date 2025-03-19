import axios from "axios";

export async function getAPI() {
    try {
        const response = await axios.get("10.28.129.163:8000/data/67d39586dba033df984487c9")
        console.log(response)
    } catch (err) {
        console.error(err);
    }
}