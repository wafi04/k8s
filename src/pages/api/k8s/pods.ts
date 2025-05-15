import { deployment } from "@/data/depoy-data";
import { Api } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: Response) {
  const namespace = req.nextUrl.searchParams || "default"; // Default namespace adalah 'default'
  const api = new Api();
  const body = await req.json();
  // URL untuk mengambil pod
  // Menangani method GET untuk mengambil data pods
  if (req.method === "GET") {
    try {
      const response = await api.get(`/namespaces/${namespace}/pods`, {
        headers: {
          Authorization: `Bearer ${process.env.KUBE_TOKEN}`, // Token untuk autentikasi
          Accept: "application/json",
        },
      });
      return NextResponse.json(
        {
          message: "Data Recieved successfully",
          data: response.data,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json({
        message: "Failed To Send Data",
        status: false,
        code: 200,
      });
    }
  }

  // Menangani method DELETE untuk menghapus deployment
  if (req.method === "DELETE") {
    const { podName, namespace } = body; // Ambil nama pod dan namespace dari body request

    if (!podName || !namespace) {
      return NextResponse.json({
        code : 400,
        status : false,
        message: "Pod name and namespace are required",
      });
    }

    try {
      const deploymentName = podName; // Anggap podName sebagai deploymentName, bisa disesuaikan jika berbeda
      const deleteUrl = `http://apps.zilog.zil:8001/apis/apps/v1/namespaces/${namespace}/deployments/${deploymentName}`;

      // Kirimkan request DELETE ke Kubernetes API untuk menghapus deployment
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${process.env.KUBE_TOKEN}`, // Token untuk autentikasi
          Accept: "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to delete pod: ${response.statusText}`);
      }

      // Jika berhasil
      return NextResponse.json({
        message :"Pod deleted successfully",
        code : 200,
        status : true
      },{
        status : 200
      })
    } catch (error) {
      console.error("Error deleting pod:", error.message);
      return NextResponse.json({
        message : error ? error instanceof Error  : error,
        code : 500,
        status : false
    } {
        status : 5000
    })
    }
  }

  // Menangani method POST untuk membuat deployment baru
  if (req.method === "POST") {
    const { name, runtime, version, image } = body

    if (!name || !runtime || !version || !image) {
      return NextResponse.json({
        status : false,
        code : 400,
        message : "Missing Required"
      }, {
        status : 400
      })

    }

    const deploymentData = deployment({
        ...body
    })

    try {
      const createUrl = `http://apps.zilog.zil:8001/apis/apps/v1/namespaces/${namespace}/deployments`;
      const response = await axios.post(createUrl, deploymentData, {
        headers: {
          Authorization: `Bearer ${process.env.KUBE_TOKEN}`,
          Accept: "application/json",
        },
      });

      if (response.status === 201) {
        return res
          .status(201)
          .json({
            message: "Deployment created successfully",
            data: response.data,
          });
      } else {
        throw new Error(`Failed to create deployment: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error creating deployment:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  // Jika method selain GET, POST, atau DELETE
  return res.status(405).json({ error: "Method Not Allowed" });
}
