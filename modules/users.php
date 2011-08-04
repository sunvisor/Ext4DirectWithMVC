<?php
/**
 * PX User Model
 * File:    users.php
 * Auther:  sunvisor
 * Date:    2011-08-03
 * Copyright (C) Sunvisor 2011 All right reserved.
 **/
class users extends xFrameworkPX_Model
{
    public $usetable = 'users';
    public $behaviors = array('log');
    private $_fields = array(
        'name',
        'email'
    );

    public function _getFields($includeId)
    {
        if( $includeId ){
            return array_merge(array('id'), $this->_fields);
        } else {
            return $this->_fields;
        }
    }

    public function _getValues($includeId)
    {
        $r = $this->_getFields($includeId);
        return array_map(
            function ($a) {
                return ":$a";
            },
            $r
        );
    }

    public function getAll() 
    {
        $param = array(
            'fields' => array(
                'id',
                'name',
                'email'
            )
        ); 
        $r = $this->get('all', $param);
        return array(
            'total' => count($r),
            'data' => $r,
            'success' => true
        );        
    }

    public function updateRec($arg)
    {
        if( is_array($arg) ){
            foreach($arg as $rec){
                $this->_updateOne($rec);
            }
        } else {
            $this->_updateOne($arg);
        }
        
        return array(
            "success" => true,
            "data" => $arg
        );
    }

    public function removeRec($arg)
    {
        $conds = array();
        if( is_array($arg) ){ 
            foreach($arg as $rec){
                $conds[] = $rec->id;
            }
        } else {
            $conds[] = $arg->id; 
        }
        $this->remove($conds);
        
        return array(
            "success" => true,
            "data" => $arg
        );
    }

    public function addRec($arg)
    {
        if( is_array($arg) ){
            foreach($arg as &$rec){
                $rec->id = $this->_addOne($rec);
            }
        } else {
            $arg->id = $this->_addOne($arg);
        }

        return array(
            "success" => true,
            "data" => $arg
        );
    }

    private function _addOne($arg)
    {
        $rec = (array)$arg;

        $param = array(
            'field' => $this->_getFields(true),
            'value' => $this->_getValues(true),
            'bind' => $rec
        );
        $r = $this->insert($param, true);
        $this->insert($param);

        return $this->lastId();
    }

    private function _updateOne($arg)
    {
        $rec = (array)$arg;
        $field = $this->_getFields(false);

        $param = array(
            'field' => $this->_getFields(false),
            'value' => $this->_getValues(false),
            'bind' => array(
                'name' => $rec['name'],
                'email' => $rec['email']
            ),
            'where' => 'id=' . $rec['id']
        );
        $this->update($param);
    }

}

