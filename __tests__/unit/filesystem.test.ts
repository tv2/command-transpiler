export {}
const filesystem = require('../../src/utilities/filesystem')

test('basename', () => {
  expect(filesystem.basename('/Users/admin/Desktop')).toEqual('Desktop')
  expect(filesystem.basename('/Users/admin/some\\ folder')).toEqual('some\\ folder')
  expect(filesystem.basename('/Users/admin\\ user/some\\ folder')).toEqual('some\\ folder')
  expect(filesystem.basename('/Users/admin/Desktop/file')).toEqual('file')
  expect(filesystem.basename('/Users/admin/Desktop/file-without_extension')).toEqual('file-without_extension')
  expect(filesystem.basename('/Users/admin/Desktop/file.json')).toEqual('file.json')
  expect(filesystem.basename('/Users/admin/Desktop/file.mov')).toEqual('file.mov')
  expect(filesystem.basename('/file.mov')).toEqual('file.mov')
  expect(filesystem.basename('file.mov')).toEqual('file.mov')
  expect(filesystem.basename('./folder/file.mov')).toEqual('file.mov')
  expect(filesystem.basename('folder/file.mov')).toEqual('file.mov')

  expect(filesystem.basename('C:/Users/admin/Desktop')).toEqual('Desktop')
  expect(filesystem.basename('C:/Users/admin/some\\ folder')).toEqual('some\\ folder')
  expect(filesystem.basename('C:/Users/admin\\ user/some\\ folder')).toEqual('some\\ folder')
  expect(filesystem.basename('C:/Users/admin/Desktop/file')).toEqual('file')
  expect(filesystem.basename('C:/Users/admin/Desktop/file-without_extension')).toEqual('file-without_extension')
  expect(filesystem.basename('C:/Users/admin/Desktop/file.json')).toEqual('file.json')
  expect(filesystem.basename('C:/Users/admin/Desktop/file.mov')).toEqual('file.mov')
  expect(filesystem.basename('C:/file.mov')).toEqual('file.mov')

  expect(filesystem.basename('C:\\Users\\admin\\Desktop')).toEqual('Desktop')
  expect(filesystem.basename('C:\\Users\\admin\\some\\ folder')).toEqual('some\\ folder')
  expect(filesystem.basename('C:\\Users\\admin\\ user\\some\\ folder')).toEqual('some\\ folder')
  expect(filesystem.basename('C:\\Users\\admin\\Desktop\\file')).toEqual('file')
  expect(filesystem.basename('C:\\Users\\admin\\Desktop\\file-without_extension')).toEqual('file-without_extension')
  expect(filesystem.basename('C:\\Users\\admin\\Desktop\\file.json')).toEqual('file.json')
  expect(filesystem.basename('C:\\Users\\admin\\Desktop\\file.mov')).toEqual('file.mov')
  expect(filesystem.basename('C:\\file.mov')).toEqual('file.mov')

  expect(filesystem.basename('\\\\triton\\Users\\admin\\Desktop')).toEqual('Desktop')
  expect(filesystem.basename('\\\\triton\\Users\\admin\\some\\ folder')).toEqual('some\\ folder')
  expect(filesystem.basename('\\\\triton\\Users\\admin\\ user\\some\\ folder')).toEqual('some\\ folder')
  expect(filesystem.basename('\\\\triton\\Users\\admin\\Desktop\\file')).toEqual('file')
  expect(filesystem.basename('\\\\triton\\Users\\admin\\Desktop\\file-without_extension')).toEqual('file-without_extension')
  expect(filesystem.basename('\\\\triton\\Users\\admin\\Desktop\\file.json')).toEqual('file.json')
  expect(filesystem.basename('\\\\triton\\Users\\admin\\Desktop\\file.mov')).toEqual('file.mov')
  expect(filesystem.basename('\\\\triton\\file.mov')).toEqual('file.mov')

  expect(filesystem.basename('\\\\triton\\')).toEqual('')
  expect(filesystem.basename('\\\\triton')).toEqual('')
  expect(filesystem.basename('C:\\')).toEqual('')
  expect(filesystem.basename('C:')).toEqual('')
  expect(filesystem.basename('/')).toEqual('')
})

test('dir', () => {
  expect(filesystem.dir('/Users/admin/Desktop')).toEqual('/Users/admin')
  expect(filesystem.dir('/Users/admin/some\\ folder')).toEqual('/Users/admin')
  expect(filesystem.dir('/Users/admin\\ user/some\\ folder')).toEqual('/Users/admin\\ user')
  expect(filesystem.dir('/Users/admin/Desktop/file')).toEqual('/Users/admin/Desktop')
  expect(filesystem.dir('/Users/admin/Desktop/file-without_extension')).toEqual('/Users/admin/Desktop')
  expect(filesystem.dir('/Users/admin/Desktop/file.json')).toEqual('/Users/admin/Desktop')
  expect(filesystem.dir('/Users/admin/Desktop/file.mov')).toEqual('/Users/admin/Desktop')
  expect(filesystem.dir('/file.mov')).toEqual('/')
  expect(filesystem.dir('file.mov')).toEqual('file.mov')
  expect(filesystem.dir('./folder/file.mov')).toEqual('./folder')
  expect(filesystem.dir('folder/file.mov')).toEqual('folder')

  expect(filesystem.dir('C:/Users/admin/Desktop')).toEqual('C:/Users/admin')
  expect(filesystem.dir('C:/Users/admin/some\\ folder')).toEqual('C:/Users/admin')
  expect(filesystem.dir('C:/Users/admin\\ user/some\\ folder')).toEqual('C:/Users/admin\\ user')
  expect(filesystem.dir('C:/Users/admin/Desktop/file')).toEqual('C:/Users/admin/Desktop')
  expect(filesystem.dir('C:/Users/admin/Desktop/file-without_extension')).toEqual('C:/Users/admin/Desktop')
  expect(filesystem.dir('C:/Users/admin/Desktop/file.json')).toEqual('C:/Users/admin/Desktop')
  expect(filesystem.dir('C:/Users/admin/Desktop/file.mov')).toEqual('C:/Users/admin/Desktop')
  expect(filesystem.dir('C:/file.mov')).toEqual('C:')

  expect(filesystem.dir('C:\\Users\\admin\\Desktop')).toEqual('C:\\Users\\admin')
  expect(filesystem.dir('C:\\Users\\admin\\some\\ folder')).toEqual('C:\\Users\\admin')
  expect(filesystem.dir('C:\\Users\\admin\\ user\\some\\ folder')).toEqual('C:\\Users\\admin\\ user')
  expect(filesystem.dir('C:\\Users\\admin\\Desktop\\file')).toEqual('C:\\Users\\admin\\Desktop')
  expect(filesystem.dir('C:\\Users\\admin\\Desktop\\file-without_extension')).toEqual('C:\\Users\\admin\\Desktop')
  expect(filesystem.dir('C:\\Users\\admin\\Desktop\\file.json')).toEqual('C:\\Users\\admin\\Desktop')
  expect(filesystem.dir('C:\\Users\\admin\\Desktop\\file.mov')).toEqual('C:\\Users\\admin\\Desktop')
  expect(filesystem.dir('C:\\file.mov')).toEqual('C:')

  expect(filesystem.dir('\\\\triton\\Users\\admin\\Desktop')).toEqual('\\\\triton\\Users\\admin')
  expect(filesystem.dir('\\\\triton\\Users\\admin\\some\\ folder')).toEqual('\\\\triton\\Users\\admin')
  expect(filesystem.dir('\\\\triton\\Users\\admin\\ user\\some\\ folder')).toEqual('\\\\triton\\Users\\admin\\ user')
  expect(filesystem.dir('\\\\triton\\Users\\admin\\Desktop\\file')).toEqual('\\\\triton\\Users\\admin\\Desktop')
  expect(filesystem.dir('\\\\triton\\Users\\admin\\Desktop\\file-without_extension')).toEqual('\\\\triton\\Users\\admin\\Desktop')
  expect(filesystem.dir('\\\\triton\\Users\\admin\\Desktop\\file.json')).toEqual('\\\\triton\\Users\\admin\\Desktop')
  expect(filesystem.dir('\\\\triton\\Users\\admin\\Desktop\\file.mov')).toEqual('\\\\triton\\Users\\admin\\Desktop')
  expect(filesystem.dir('\\\\triton\\file.mov')).toEqual('\\\\triton')

  expect(filesystem.dir('\\\\triton\\')).toEqual('\\\\triton')
  expect(filesystem.dir('\\\\triton')).toEqual('\\\\triton')
  expect(filesystem.dir('C:\\')).toEqual('C:')
  expect(filesystem.dir('C:')).toEqual('C:')
  expect(filesystem.dir('/')).toEqual('/')
})

test('join', () => {
  expect(filesystem.join('/Users','admin','Desktop')).toEqual('/Users/admin/Desktop')
  expect(filesystem.join('/Users','admin','some\\ folder')).toEqual('/Users/admin/some\\ folder')
  expect(filesystem.join('/Users','admin\\ user','some\\ folder')).toEqual('/Users/admin\\ user/some\\ folder')
  expect(filesystem.join('/Users','admin','Desktop','file')).toEqual('/Users/admin/Desktop/file')
  expect(filesystem.join('/Users','admin','Desktop','file-without_extension')).toEqual('/Users/admin/Desktop/file-without_extension')
  expect(filesystem.join('/Users','admin','Desktop','file.json')).toEqual('/Users/admin/Desktop/file.json')
  expect(filesystem.join('/Users','admin','Desktop','file.mov')).toEqual('/Users/admin/Desktop/file.mov')
  expect(filesystem.join('/file.mov')).toEqual('/file.mov')
  expect(filesystem.join('file.mov')).toEqual('file.mov')
  expect(filesystem.join('./folder','file.mov')).toEqual('./folder/file.mov')
  expect(filesystem.join('folder','file.mov')).toEqual('folder/file.mov')

  expect(filesystem.join('C:/Users','admin','Desktop')).toEqual('C:/Users/admin/Desktop')
  expect(filesystem.join('C:/Users','admin','some\\ folder')).toEqual('C:/Users/admin/some\\ folder')
  expect(filesystem.join('C:/Users','admin\\ user','some\\ folder')).toEqual('C:/Users/admin\\ user/some\\ folder')
  expect(filesystem.join('C:/Users','admin','Desktop','file')).toEqual('C:/Users/admin/Desktop/file')
  expect(filesystem.join('C:/Users','admin','Desktop','file-without_extension')).toEqual('C:/Users/admin/Desktop/file-without_extension')
  expect(filesystem.join('C:/Users','admin','Desktop','file.json')).toEqual('C:/Users/admin/Desktop/file.json')
  expect(filesystem.join('C:/Users','admin','Desktop','file.mov')).toEqual('C:/Users/admin/Desktop/file.mov')
  expect(filesystem.join('C:/file.mov')).toEqual('C:/file.mov')

  expect(filesystem.join('\\\\triton\\Users','admin','Desktop')).toEqual('\\\\triton\\Users\\admin\\Desktop')
  expect(filesystem.join('\\\\triton\\Users','admin','some\\ folder')).toEqual('\\\\triton\\Users\\admin\\some\\ folder')
  expect(filesystem.join('\\\\triton\\Users','admin\\ user','some\\ folder')).toEqual('\\\\triton\\Users\\admin\\ user\\some\\ folder')
  expect(filesystem.join('\\\\triton\\Users','admin','Desktop','file')).toEqual('\\\\triton\\Users\\admin\\Desktop\\file')
  expect(filesystem.join('\\\\triton\\Users','admin','Desktop','file-without_extension')).toEqual('\\\\triton\\Users\\admin\\Desktop\\file-without_extension')
  expect(filesystem.join('\\\\triton\\Users','admin','Desktop','file.json')).toEqual('\\\\triton\\Users\\admin\\Desktop\\file.json')
  expect(filesystem.join('\\\\triton\\Users','admin','Desktop','file.mov')).toEqual('\\\\triton\\Users\\admin\\Desktop\\file.mov')
  expect(filesystem.join('\\\\triton\\file.mov')).toEqual('\\\\triton\\file.mov')

  expect(filesystem.join('C:\\Users','admin','Desktop')).toEqual('C:\\Users\\admin\\Desktop')
  expect(filesystem.join('C:\\Users','admin','some\\ folder')).toEqual('C:\\Users\\admin\\some\\ folder')
  expect(filesystem.join('C:\\Users','admin\\ user','some\\ folder')).toEqual('C:\\Users\\admin\\ user\\some\\ folder')
  expect(filesystem.join('C:\\Users','admin','Desktop','file')).toEqual('C:\\Users\\admin\\Desktop\\file')
  expect(filesystem.join('C:\\Users','admin','Desktop','file-without_extension')).toEqual('C:\\Users\\admin\\Desktop\\file-without_extension')
  expect(filesystem.join('C:\\Users','admin','Desktop','file.json')).toEqual('C:\\Users\\admin\\Desktop\\file.json')
  expect(filesystem.join('C:\\Users','admin','Desktop','file.mov')).toEqual('C:\\Users\\admin\\Desktop\\file.mov')
  expect(filesystem.join('C:\\file.mov')).toEqual('C:\\file.mov')
})

test('normalizePath', () => {
  expect(filesystem.normalizePath('/Users/admin/Desktop')).toEqual('/Users/admin/Desktop')
  expect(filesystem.normalizePath('/Users/admin/Desktop/')).toEqual('/Users/admin/Desktop')
  expect(filesystem.normalizePath('C:/Users/admin/Desktop')).toEqual('C:/Users/admin/Desktop')
  expect(filesystem.normalizePath('C:/Users/admin/Desktop/')).toEqual('C:/Users/admin/Desktop')
  expect(filesystem.normalizePath('C:\\Users\\admin\\Desktop')).toEqual('C:\\Users\\admin\\Desktop')
  expect(filesystem.normalizePath('C:\\Users\\admin\\Desktop\\')).toEqual('C:\\Users\\admin\\Desktop')
  expect(filesystem.normalizePath('C:\\')).toEqual('C:')
  expect(filesystem.normalizePath('/')).toEqual('/')
})

test('convertPath', () => {
  expect(filesystem.convertPath('/Users/admin/Desktop/file.txt', '/Users/admin/Desktop', '/Volumes/USB')).toEqual('/Volumes/USB/file.txt')
  expect(filesystem.convertPath('/Users/admin/Desktop/file.txt', '/Users/admin/Desktop', '/Volumes/USB/')).toEqual('/Volumes/USB/file.txt')
  expect(filesystem.convertPath('/Users/admin/Desktop/file.txt', '/Users/admin/Desktop/', '/Volumes/USB')).toEqual('/Volumes/USB/file.txt')
})

test('mount', () => {
  expect(filesystem.mount('/Users/admin/Desktop/file.txt')).toEqual('/')
  expect(filesystem.mount('/Users/admin/')).toEqual('/')
  expect(filesystem.mount('/Users/admin')).toEqual('/')
  expect(filesystem.mount('/file.txt')).toEqual('/')
  expect(filesystem.mount('/')).toEqual('/')

  expect(filesystem.mount('./Users/admin/Desktop/file.txt')).toEqual('/')
  expect(filesystem.mount('./Users/admin/')).toEqual('/')
  expect(filesystem.mount('./Users/admin')).toEqual('/')
  expect(filesystem.mount('./file.txt')).toEqual('/')
  expect(filesystem.mount('./')).toEqual('/')

  expect(filesystem.mount('Users/admin/Desktop/file.txt')).toEqual('/')
  expect(filesystem.mount('Users/admin/')).toEqual('/')
  expect(filesystem.mount('Users/admin')).toEqual('/')
  expect(filesystem.mount('file.txt')).toEqual('/')
  expect(filesystem.mount('.')).toEqual('/')

  expect(filesystem.mount('/Volumes/drive-e/Users/admin/Desktop/file.txt')).toEqual('/Volumes/drive-e')
  expect(filesystem.mount('/Volumes/drive-e/Users/admin/')).toEqual('/Volumes/drive-e')
  expect(filesystem.mount('/Volumes/drive-e/Users/admin')).toEqual('/Volumes/drive-e')
  expect(filesystem.mount('/Volumes/drive-e/file.txt')).toEqual('/Volumes/drive-e')
  expect(filesystem.mount('/Volumes/drive-e/')).toEqual('/Volumes/drive-e')
  expect(filesystem.mount('/Volumes/drive-e')).toEqual('/Volumes/drive-e')

  expect(filesystem.mount('C:/Users/admin/Desktop/file.txt')).toEqual('C:')
  expect(filesystem.mount('C:/Users/admin/')).toEqual('C:')
  expect(filesystem.mount('C:/Users/admin')).toEqual('C:')
  expect(filesystem.mount('C:/file.txt')).toEqual('C:')
  expect(filesystem.mount('C:/')).toEqual('C:')
  expect(filesystem.mount('C:')).toEqual('C:')

  expect(filesystem.mount('C:\\Users\\admin\\Desktop\\file.txt')).toEqual('C:')
  expect(filesystem.mount('C:\\Users\\admin\\')).toEqual('C:')
  expect(filesystem.mount('C:\\Users\\admin')).toEqual('C:')
  expect(filesystem.mount('C:\\file.txt')).toEqual('C:')
  expect(filesystem.mount('C:\\')).toEqual('C:')
  expect(filesystem.mount('C:')).toEqual('C:')

  expect(filesystem.mount('\\\\triton\\Users\\admin\\Desktop\\file.txt')).toEqual('\\\\triton')
  expect(filesystem.mount('\\\\triton\\Users\\admin\\')).toEqual('\\\\triton')
  expect(filesystem.mount('\\\\triton\\Users\\admin')).toEqual('\\\\triton')
  expect(filesystem.mount('\\\\triton\\file.txt')).toEqual('\\\\triton')
  expect(filesystem.mount('\\\\triton\\')).toEqual('\\\\triton')
  expect(filesystem.mount('\\\\triton')).toEqual('\\\\triton')
})
