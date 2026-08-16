const { ReadDatabase, WriteDatabase } = require("./server/database");

const myDoctors = [
    // Cardiology
    {
        name: "Prof. Dr. Jahangir Kabir",
        specialization: "cardiology",
        email: "jahangir.kabir@medcore.test"
    },
    {
        name: "Prof. Dr. Moeen Uddin Ahmed",
        specialization: "cardiology",
        email: "moeen.ahmed@medcore.test"
    },
    {
        name: "Prof. Dr. Sayed Azizul Haque",
        specialization: "cardiology",
        email: "azizul.haque@medcore.test"
    },
    {
        name: "Dr. Golam Mahfuz Rabbani",
        specialization: "cardiology",
        email: "golam.rabbani@medcore.test"
    },
    {
        name: "Dr. Muhammed Akhtaruzzaman",
        specialization: "cardiology",
        email: "akhtaruzzaman@medcore.test"
    },
    {
        name: "Dr. Nighat Islam",
        specialization: "cardiology",
        email: "nighat.islam@medcore.test"
    },

    // Neurology
    {
        name: "Asso. Prof. Dr. Kabiruzzaman",
        specialization: "neurology",
        email: "kabiruzzaman@medcore.test"
    },
    {
        name: "Prof. Dr. Kazi Mohibur Rahman",
        specialization: "neurology",
        email: "mohibur.rahman@medcore.test"
    },
    {
        name: "Dr. Shahidul Islam",
        specialization: "neurology",
        email: "shahidul.islam@medcore.test"
    },
    {
        name: "Asst. Prof. Dr. Rajesh Saha",
        specialization: "neurology",
        email: "rajesh.saha@medcore.test"
    },
    {
        name: "Prof. Dr. Md. Rafiqul Islam",
        specialization: "neurology",
        email: "rafiqul.islam@medcore.test"
    },

    // Dermatology
    {
        name: "Prof. Dr. Col. A T Rezaul Karim",
        specialization: "dermatology",
        email: "rezaul.karim@medcore.test"
    },
    {
        name: "Dr. Tanvir Ahmed Siddique",
        specialization: "dermatology",
        email: "tanvir.siddique@medcore.test"
    },
    {
        name: "Dr. Tanjina Nasrin",
        specialization: "dermatology",
        email: "tanjina.nasrin@medcore.test"
    },
    {
        name: "Asso. Prof. Dr. Md. Abdul Mannan",
        specialization: "dermatology",
        email: "abdul.mannan@medcore.test"
    },
    {
        name: "Asst. Prof. Dr. Fatematuz Zohra",
        specialization: "dermatology",
        email: "fatematuz.zohra@medcore.test"
    },

    // Pediatrics
    {
        name: "Dr. Md. Lutfor Rahman",
        specialization: "pediatrics",
        email: "lutfor.rahman@medcore.test"
    },
    {
        name: "Dr. Fahmida Zabeen",
        specialization: "pediatrics",
        email: "fahmida.zabeen@medcore.test"
    },
    {
        name: "Dr. Md. Mostafizur Rahman",
        specialization: "pediatrics",
        email: "mostafizur.rahman@medcore.test"
    },
    {
        name: "Prof. Dr. Ishrat Jahan Lucky",
        specialization: "pediatrics",
        email: "ishrat.lucky@medcore.test"
    },
    {
        name: "Prof. Dr. Salahuddin Mahmud",
        specialization: "pediatrics",
        email: "salahuddin.mahmud@medcore.test"
    },

    // Orthopedics
    {
        name: "Prof. Dr. Col. Md. Mahbub Ali",
        specialization: "orthopedics",
        email: "mahbub.ali@medcore.test"
    },
    {
        name: "Prof. Dr. Sayedur Rahman",
        specialization: "orthopedics",
        email: "sayedur.rahman@medcore.test"
    },
    {
        name: "Dr. Md. Amjad Ali",
        specialization: "orthopedics",
        email: "amjad.ali@medcore.test"
    },
    {
        name: "Asst. Prof. Dr. Md. Najibul Islam",
        specialization: "orthopedics",
        email: "najibul.islam@medcore.test"
    },
    {
        name: "Dr. Dibakar Sarkar",
        specialization: "orthopedics",
        email: "dibakar.sarkar@medcore.test"
    },
    {
        name: "Prof. Dr. M.H.M. Alamgir",
        specialization: "orthopedics",
        email: "mhm.alamgir@medcore.test"
    },

    // General Medicine
    {
        name: "Prof. Dr. Mir Mahfuzul Hoque Chowdhury",
        specialization: "general-medicine",
        email: "mahfuzul.chowdhury@medcore.test"
    },
    {
        name: "Asst. Prof. Dr. Kamolesh Chandra Bashu",
        specialization: "general-medicine",
        email: "kamolesh.bashu@medcore.test"
    },
    {
        name: "Asst. Prof. Dr. Tanjila Ferdousi",
        specialization: "general-medicine",
        email: "tanjila.ferdousi@medcore.test"
    },
    {
        name: "Prof. Dr. Khwaja Nazim Uddin",
        specialization: "general-medicine",
        email: "khwaja.nazim@medcore.test"
    },
    {
        name: "Prof. Dr. Quazi Tarikul Islam",
        specialization: "general-medicine",
        email: "tarikul.islam@medcore.test"
    }
];

async function addDoctors() {
    try {
        console.log("Reading existing doctors...");

        const existingDoctors = (await ReadDatabase("doctors")) || {};

        console.log(
            `Existing doctors: ${Object.keys(existingDoctors).length}`
        );

        const updatedDoctors = { ...existingDoctors };

        myDoctors.forEach((doctor, index) => {
            const doctorNumber = String(index + 7).padStart(3, "0");
            const doctorId = `doc_${doctorNumber}`;

            updatedDoctors[doctorId] = doctor;
        });

        await WriteDatabase("doctors", updatedDoctors);

        console.log(
            `Added ${myDoctors.length} doctors successfully!`
        );

        console.log(
            `Total doctors now: ${Object.keys(updatedDoctors).length}`
        );

    } catch (error) {
        console.error("Error:", error.message);
    }
}

addDoctors();