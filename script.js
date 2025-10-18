$(document).ready(function() {
  let editId = null;

  function loadData() {
    $.post('api/mahasiswa.php', { action: 'read' }, function(data) {
      const mahasiswa = JSON.parse(data);
      let rows = '';
      mahasiswa.forEach(m => {
        rows += `
          <tr>
            <td>${m.id}</td>
            <td>${m.nama}</td>
            <td>${m.nim}</td>
            <td>${m.jurusan}</td>
            <td>
              <button class="editBtn" data-id="${m.id}" data-nama="${m.nama}" data-nim="${m.nim}" data-jurusan="${m.jurusan}">Edit</button>
              <button class="delBtn" data-id="${m.id}">Hapus</button>
            </td>
          </tr>
        `;
      });
      $('#dataList').html(rows);
    });
  }

  loadData();

  // CREATE / UPDATE
  $('#addBtn').click(function() {
    const nama = $('#nama').val();
    const nim = $('#nim').val();
    const jurusan = $('#jurusan').val();

    if (!nama || !nim || !jurusan) return alert('Semua field wajib diisi!');

    const action = editId ? 'update' : 'create';
    const postData = { action, nama, nim, jurusan };
    if (editId) postData.id = editId;

    $.post('api/mahasiswa.php', postData, function() {
      loadData();
      $('#nama,#nim,#jurusan').val('');
      $('#addBtn').text('Tambah');
      editId = null;
    });
  });

  // EDIT
  $(document).on('click', '.editBtn', function() {
    $('#nama').val($(this).data('nama'));
    $('#nim').val($(this).data('nim'));
    $('#jurusan').val($(this).data('jurusan'));
    editId = $(this).data('id');
    $('#addBtn').text('Update');
  });

  // DELETE
  $(document).on('click', '.delBtn', function() {
    const id = $(this).data('id');
    if (confirm('Yakin hapus data ini?')) {
      $.post('api/mahasiswa.php', { action: 'delete', id }, function() {
        loadData();
      });
    }
  });
});
