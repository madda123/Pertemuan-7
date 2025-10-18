<?php
$connect = new mysqli("localhost", "root", "", "db_mahasiswa");

$action = $_POST['action'] ?? '';

if ($action == 'read') {
    $result = $connect->query("SELECT * FROM mahasiswa ORDER BY id DESC");
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data);
}

if ($action == 'create') {
    $nama = $_POST['nama'];
    $nim = $_POST['nim'];
    $jurusan = $_POST['jurusan'];
    $connect->query("INSERT INTO mahasiswa (nama, nim, jurusan) VALUES ('$nama', '$nim', '$jurusan')");
}

if ($action == 'update') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $nim = $_POST['nim'];
    $jurusan = $_POST['jurusan'];
    $connect->query("UPDATE mahasiswa SET nama='$nama', nim='$nim', jurusan='$jurusan' WHERE id=$id");
}

if ($action == 'delete') {
    $id = $_POST['id'];
    $connect->query("DELETE FROM mahasiswa WHERE id=$id");
}
?>
